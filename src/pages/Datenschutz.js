import React from "react";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";

const Impressum = () => {
  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <Card>
            <Card.Header className="display-5 font-dancing">
            Datenschutz
            </Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <strong>§1 INFORMATION ÜBER DIE ERHEBUNG PERSONENBEZOGENER DATEN</strong>
                <br />  <br /> 
                (1) Im Folgenden informieren wir über die Erhebung personenbezogener Daten bei Nutzung unserer Website. Personenbezogene Daten sind alle Daten, die auf Sie persönlich beziehbar sind, z. B. Name, Adresse, E-Mail-Adressen, Nutzerverhalten.
                <br /><br />
                (2) Verantwortlicher gem. Art.4 Abs.7 EU-Datenschutz-Grundverordnung (DS-GVO) ist:
                <br /><br />s
                Gesa Rudolph
                <br />
                No de Halloh 8a 
                <br />
                25591 Ottenbüttel
                <br />
                Telefon: +49 151 16321085
                <br />
                E-Mail: GesaRudolph@hotmail.de
                <br /><br />
                (3) Bei Ihrer Kontaktaufnahme mit uns per E-Mail oder über ein Kontaktformular werden die von Ihnen mitgeteilten Daten (Ihre E-Mail-Adresse, ggf. Ihr Name und Ihre Telefonnummer) von uns gespeichert, um Ihre Fragen zu beantworten. Die in diesem Zusammenhang anfallenden Daten löschen wir, nachdem die Speicherung nicht mehr erforderlich ist, oder schränken die Verarbeitung ein, falls gesetzliche Aufbewahrungspflichten bestehen.
                (4) Falls wir für einzelne Funktionen unseres Angebots auf beauftragte Dienstleister zurückgreifen oder Ihre Daten für werbliche Zwecke nutzen möchten, werden wir Sie untenstehend im Detail über die jeweiligen Vorgänge informieren. Dabei nennen wir auch die festgelegten Kriterien der Speicherdauer.

              </ListGroup.Item>
              <ListGroup.Item>
                <strong>§2 IHRE RECHTE</strong><br/> <br /> 
                (1) Sie haben gegenüber uns folgende Rechte hinsichtlich der Sie betreffenden personenbezogenen Daten:
                <br /> <br /> 
                Recht auf Auskunft,
                <br />
                Recht auf Berichtigung oder Löschung,
                <br />
                Recht auf Einschränkung der Verarbeitung,
                <br />
                Recht auf Widerspruch gegen die Verarbeitung,
                <br />
                Recht auf Datenübertragbarkeit. 
                <br />
                <br />
                (2) Sie haben zudem das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die Verarbeitung Ihrer personenbezogenen Daten durch uns zu beschweren.
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>§3 ERHEBUNG PERSONENBEZOGENER DATEN BEI BESUCH UNSERER WEBSITE</strong>
                <br /> <br /> 
                (1) Bei der bloß informatorischen Nutzung der Website, also wenn Sie sich nicht registrieren oder uns anderweitig Informationen übermitteln, erheben wir nur die personenbezogenen Daten, die Ihr Browser an unseren Server übermittelt. Wenn Sie unsere Website betrachten möchten, erheben wir die folgenden Daten, die für uns technisch erforderlich sind, um Ihnen unsere Website anzuzeigen und die Stabilität und Sicherheit zu gewährleisten (Rechtsgrundlage ist Art.6 Abs.1 S.1 lit. f DS-GVO):
                <br /><br />
                IP-Adresse
                <br />
                Datum und Uhrzeit der Anfrage
                <br />
                Zeitzonendifferenz zur Greenwich Mean Time (GMT)<br />
                Inhalt der Anforderung (konkrete Seite)<br />
                Zugriffsstatus/HTTP-Statuscode<br />
                jeweils übertragene Datenmenge<br />
                Website, von der die Anforderung kommt<br />
                Betriebssystem und dessen Oberfläche<br />
                Browser<br />
                Sprache und Version der Browsersoftware.<br /> <br /> 
                (2) Zusätzlich zu den zuvor genannten Daten werden bei Ihrer Nutzung unserer Website Cookies auf Ihrem Rechner gespeichert. Bei Cookies handelt es sich um kleine Textdateien, die auf Ihrer Festplatte dem von Ihnen verwendeten Browser zugeordnet gespeichert werden und durch welche der Stelle, die den Cookie setzt (hier durch uns), bestimmte Informationen zufließen. Cookies können keine Programme ausführen oder Viren auf Ihren Computer übertragen. Sie dienen dazu, das Internetangebot insgesamt nutzerfreundlicher und effektiver zu machen.
                <br /> <br /> 
                (3) Einsatz von Cookies:<br /> <br /> 
                a) Diese Website nutzt keine Arten von Cookies<br />
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Impressum;
