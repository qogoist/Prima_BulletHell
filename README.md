# For Whom the Paint Tolls
Ein Bullet-Hell-artiges spiel in FUDGE - Abgabe von Jonas Haller im Kurs "Prototyping interaktiver Medienanwendungen" im Sommersemester 2020.

* [Spiele For Whome the Paint Tolls](Game/Main.html)
* [Quellcode](https://github.com/qogoist/Prima_BulletHell/tree/master/Game)
* [Designdokument](designdokument.pdf)
* [Gepacktes Archiv](archive.zip)
* [Anleitung](Anleitung.md)


## Checkliste für Leistungsnachweis
© Prof. Dipl.-Ing. Jirka R. Dell'Oro-Friedl, HFU

| Nr | Bezeichnung           | Inhalt                                                                                                                                                                                                                                                                         |
|---:|-----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|    | Titel                 | For Whom the Paint Tolls |
|    | Name                  | Jonas Haller             |
|    | Matrikelnummer        | 259194                   |
|  1 | Nutzerinteraktion     | Das Spiel wird mit den Tasten "W,A,S,D" sowie mit der Maus gesteuert. Mit "W,A,S,D" wird dabei die Spielfigur durch die Welt bewegt und mit der Maus wird die Blick- bzw. Schussrichtung gesteuert. Per Klick der Linken Maustaste kann geschossen werden. Die Maus wird au0erdem benutzt um das Hauptmenü und das Pausenmenü, welches per "ESC" geöffnet werden kann, zu navigieren.|
|  2 | Objektinteraktion     | Die Kollisionsabfragen während des Spiels lassen sich in 4 Kategorien aufteilen: **1. Kollision ziwschen zweier Gegner (Bsp. "SmallEnemy" oder "Spawner"):**  Hierbei wird die Bewegungsrichtung der Gegner so korriegiert dass diese sich voneinander weg bewegen. **2. Kollision zwischen Gegner und Spieler:** Hier unterscheidet sich das Verhalten je nach Gegner. Gegner die SChaden ausrichten (z.B. "EnemySmall") richten bei der Kollision den Schaden am Spieler an und werden dann zerstört. Kollidiert der Spieler aber z.B. mit einem "Spawner" wird lediglich verhindert dass die Modelle sich überschneiden. **3. Kollision zwischen Projektil und Gegner:** Hierbei wird schaden am Gegner angerichtet und das Projektil wird gelöscht. **4. Kollision mit dem Kartenrand:** Hier werden lediglich die momentanen Koordinaten eines Elements mit denen des Kartenrands verglichen um zu verhindern dass Spieler oder Gegner sich aus der Karte bewegen. **Allgemein:** Allgemein wurde zum Zweck der Kollisionsabfrage das Interface "CollisionSphere" implementiert, welches die entsprechenden Objekte mit einem Radius versehen. In der Methode "collidesWith" wird dann die Distanz zwischen zwei solchen Objekten mit dem Kombinierten Radius verglichen um eine Kollision zu ermittlen. Sowohl Projektile, als auch Aktoren (Spieler und Gegner) überprüfen in jedem Loop ob eine Kollision stattfindet. |
|  3 | Objektanzahl variabel | Wird die Maus gedrückt, als ein Schuss abgefeuert, so wird ein Projektil erzeugt. Außerdem erzeugen die "Spawner" in regelmäßigen Abständen neue Gegner. Zu guter letzt werden zusätzliche "Spawner" erzeugt um das Spiel mit zunehmender Spieldauer schwieriger zu gestalten.  |
|  4 | Szenenhierarchie      | An der Spitze der Szenenhierarchie steht ein Node names "graph" in dem alle anderen Nodes gefasst werden. Direkt darunter befindent sich "map", also die Karte auf der dass Spielgeschehen stattfindet, sowie mit "projectileList" eine Liste der momentan existierenden Projektile. In "map" befinden sich weiterhin eine Liste aller Gegner, der Spieler, sowie die Bodenplatte. Der Spieler hat weiterhin eine Node mit mehreren Subnodes die das Modell darstellen. Dies ist nötig da Drehung der Spielfigur und Bewegung getrennt werden. Es dreht sich also nur das Modell des Spielers während die eigentliche TransformComponente nicht gedreht sondern nur über das Spielfeld bewegt wird.|
|  5 | Sound                 | Es existiert ein Backgroundtrack der die Grundstimmung erzeugen soll. Außerdem wird mit jedem Schuss ein Sound ausgelößt und jedes mal wenn der Spieler von einem Gegner getroffen wird, wird ebenfalls ein entsprechender Ton ausgelöst um dies zu signalisieren. Lautstärke von Musik, SFX, und Gesamtlautstärke können einzeln angepasst werden. |
|  6 | GUI                   | Es existiert ein Hauptmenü in dem der Spieler vor Start des Spiels eine Farbe auswählen kann, sowie die Gesamtlautstärke und Lautstärke von Musik und SFX ändern kann. Währen des Spiels sind am oberen Bildschirmrand die verbleibenden Lebenspunkte und der Momentane Score sichtbar. Außerdem kann per "ESC" das Spiel pausiert werden und ein Pausenmenü gezeigt werden, in dem die Lautstärke angepasst werden kann und zurück ins Hauptmenü gewechselt werden kann. Ist das Spiel verloren (also die Lebenspunkte auf 0), so kann per UI wieder ins Menü gewechselt werden um ein neues Spiel zu starten. |
|  7 | Externe Daten         | Es gibt eine "config" Datei (in "Externals/config.json") in der einige Parameter des Spiels angepasst werden können. Diese enthält folgende Werte: Kartengröße, Farbe des Kartenbodens, Kameraposition, Rate mit der neue Spawner erzeugt werden, ein der angibt wie schnell diese Rate zunimmt, die wählbaren Farben, die Werte des Spielcharakters sowie der Gegner (Lebenspunkte, Geschwindigkeit, Schaden, Wert), die Projektileigentschaften (Geschwindigkeit, Lebensdauer, Schaden), sowie die Rate mit der Spawner neue Gegner erzeugen und welche Gegner erzeugt werden.  |
|  8 | Verhaltensklassen     | Das Verhalten des Spielercharakters und der Gegner ist in einzelne Methoden aufgeteilt. Diese beinhalten unter anderem, die Bewegung, Kollisionsprüfung, sowie das Drehen und Schießen im Fall des Spielers. Projektile erhalten ebenfalls eigene Methoden zum Bewegen und zur Kollisionsprüfung. |
|  9 | Subklassen            | Alle gegnerKlassen sind Subklassen der abstrakten Klasse "Enemy", welche zusammen mit der Klasse "Player" eine Subklasse der abstrakten Klasse "Actor" ist. Dies wurde gewählt weil sich alle Gegner und die Spielfigure gewisse Eigenschaften, wie z.B. Lebenspunkte und Geschwindigkeit, sowie de Fähigkeit sich zu bewegen und auf Kollisionen zu Prüfen teilen. Die Projektile haben ihre eigene Superklasse "Projectile" die von allen Projektilen erweitert wird, da sie sich in ihren Eigenschaften doch von den Aktoren underscheiden. So haben Projektile z.B. keine Lebenspunkte und keine dedizierte Bewegungsfunktion. |
| 10 | Maße & Positionen     | Größen sind durchweg in Meter, Geschwindigkeiten in Meter/Sekunde angegeben. Richtungsvektoren werden möglichst normiert angegeben. So ist die Spielfigure z.B. 1 Meter Groß und bewegt sich standardmäßig mit einer Geschwindigkeit von 3m/s. Im Vergleich dazu bewegen sich die Projektile mit 10m/s sehr langsam. Es wurde hier bewusst auf eine realistische Abbildung verzichtet um eine angenehmeres Spielgefühl zu erzeugen. Dennoch richten sich die Werte prinzipiell nach dem metrischen System um eine grundlegende Vergleichbarkeit zu schaffen. |
| 11 | Event-System          | Die Nutzereingaben im Spiel, sowie in den Menüs werden mittels des Eventsystems entgegen genommen und an die entsprechenden Funktionen weitergegeben. |