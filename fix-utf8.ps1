# Fix broken UTF-8 mojibake in SmartPay mobile screens
# Run from the project root (where app/, components/, etc. live):
#   powershell -ExecutionPolicy Bypass -File .\fix-utf8.ps1
#   OR just paste this whole file into the VS Code PowerShell terminal.
#
# NOTE: use a PowerShell terminal, NOT the default cmd/bash one.
#       Also make sure VS Code saves files as UTF-8 so they don't re-break.

$utf8 = [System.Text.Encoding]::UTF8

# Convert a hex string like 'C3 A2 E2 82 AC' into a byte[]
function B([string]$hex) {
    $parts = $hex -split ' '
    $arr = New-Object byte[] $parts.Count
    for ($i = 0; $i -lt $parts.Count; $i++) { $arr[$i] = [Convert]::ToByte($parts[$i], 16) }
    return ,[byte[]]$arr
}

# Find all start indexes of pattern `pat` inside `data`
function FindSeq([byte[]]$data, [byte[]]$pat) {
    $found = New-Object System.Collections.ArrayList
    $limit = $data.Length - $pat.Length
    for ($i = 0; $i -le $limit; $i++) {
        $m = $true
        for ($j = 0; $j -lt $pat.Length; $j++) {
            if ($data[$i + $j] -ne $pat[$j]) { $m = $false; break }
        }
        if ($m) { [void]$found.Add($i) }
    }
    return ,$found
}

# Replace every occurrence of `pat` with `rep` in `data`; returns the count replaced.
function ReplaceAll([byte[]]$data, [byte[]]$pat, [byte[]]$rep) {
    $idxs = FindSeq $data $pat
    if ($idxs.Count -eq 0) { return ,$data }
    $out = New-Object System.Collections.ArrayList
    $last = 0
    foreach ($i in $idxs) {
        for ($k = $last; $k -lt $i; $k++) { [void]$out.Add($data[$k]) }
        foreach ($b in $rep) { [void]$out.Add($b) }
        $last = $i + $pat.Length
    }
    for ($k = $last; $k -lt $data.Length; $k++) { [void]$out.Add($data[$k]) }
    return ,($out.ToArray())
}

# broken-hex-sequence  ->  the correct character(s)
$table = [ordered]@{
    'C3 B0 C5 B8 E2 80 98 E2 80 B9' = @([char]0xD83D,[char]0xDC4B)   # greeting -> 👋 U+1F44B
    'C3 A2 E2 82 AC C2 A2'          = @([char]0x2022)                 # -> •  U+2022 (bullet)
    'C3 A2 E2 82 AC E2 80 9D'       = @([char]0x2014)                 # -> —  U+2014 (em dash)
    'C3 B0 C5 B8 C2 A7 C2 BE'       = @([char]0xD83E,[char]0xDDFE)    # -> 🧾 U+1F9FE (receipt)
    'C3 B0 C5 B8 E2 80 99 C2 B3'    = @([char]0xD83D,[char]0xDCB3)    # -> 💳 U+1F4B3 (credit card)
    'C3 B0 C5 B8 E2 80 9C C5 A0'    = @([char]0xD83D,[char]0xDCCA)    # -> 📊 U+1F4CA (bar chart)
    'C3 B0 C5 B8 E2 80 9C C2 A2'    = @([char]0xD83D,[char]0xDCE2)    # -> 📢 U+1F4E2 (loudspeaker)
    'C3 A2 C5 93 E2 80 9C'          = @([char]0x2713)                 # -> ✓  U+2713 (check)
}

$targets = @(
    "$PWD\app\(tabs)\home.tsx",
    "$PWD\app\(tabs)\payments.tsx"
)

foreach ($path in $targets) {
    if (-not (Test-Path -LiteralPath $path)) { Write-Host "SKIP (not found): $path"; continue }

    $data = [System.IO.File]::ReadAllBytes($path)
    $report = @()
    foreach ($entry in $table.GetEnumerator()) {
        $pat  = B $entry.Key
        $good = $utf8.GetBytes((-join $entry.Value))
        $cnt  = (FindSeq $data $pat).Count
        if ($cnt -gt 0) {
            $data = ReplaceAll $data $pat $good
            $report += "   {0}  x{1}" -f $entry.Key, $cnt
        }
    }
    [System.IO.File]::WriteAllBytes($path, $data)
    Write-Host "FIXED: $path"
    if ($report.Count -eq 0) { Write-Host "   (no mojibake patterns found)" } else { $report | ForEach-Object { Write-Host $_ } }
}
Write-Host "Done."