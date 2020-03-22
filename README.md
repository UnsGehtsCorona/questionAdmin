# Allgemeines
Angular 8

Node 10.13 (wichtig! - 13.x will nicht so, wie ich das grad will)

#Build
`npm build`

Ergebnis liegt dann im dist-ordner

Build erwartet, dass die App unter "/admin" läuft (also Pfad, keine Subdomain)

Falls es unter einer Subdomain läuft, in der package.json `--baseHref=/admin/` einfach entfernen
