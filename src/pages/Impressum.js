import React from "react";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";

const Impressum = () => {
  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <Card>
            <Card.Header className="display-5 font-dancing">
              Impressum
            </Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <strong>Inhaltlich verantwortlich gemäß §5 TMG</strong>
                <br />
                Gesa Rudolph
                <br />
                No de Halloh 8a
                <br />
                25591 Ottenbüttel
                <br />
                Telefon: +49 151 16321085
                <br />
                E-Mail: GesaRudolph@hotmail.de
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Quellenangaben für die verwendeten Bilder</strong><br/>
                Nadine Merschmann (Coverfunken) /  <a href="https://www.nadinemerschmann.de">www.nadinemerschmann.de</a> 
                <br />
                Jaqueline Kropmanns /{" "}
                <a href="https://jaqueline-kropmanns.de/">
                  www.jaqueline-kropmanns.de
                </a>
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Programmierung und Hosting der Website</strong>
                <br />
                Marco Rudolph
                <br />
                Email: MarcoRudolph09@hotmail.com
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Haftungsausschluss (Disclaimer)</strong>
                <br />
                <br />
                <strong>01. Haftung für Inhalte</strong>
                <br />
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene
                Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
                verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
                Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
                gespeicherte fremde Informationen zu überwachen oder nach
                Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
                hinweisen. Verpflichtungen zur Entfernung oder Sperrung der
                Nutzung von Informationen nach den allgemeinen Gesetzen bleiben
                hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst
                ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung
                möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen
                werden wir diese Inhalte umgehend entfernen.
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>02. Haftung für Links</strong>
                <br />
                Unser Angebot enthält Links zu externen Webseiten Dritter, auf
                deren Inhalte wir keinen Einfluss haben. Deshalb können wir für
                diese fremden Inhalte auch keine Gewähr übernehmen. Für die
                Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
                oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten
                wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße
                überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der
                Verlinkung nicht erkennbar. Eine permanente inhaltliche
                Kontrolle der verlinkten Seiten ist jedoch ohne konkrete
                Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei
                Bekanntwerden von Rechtsverletzungen werden wir derartige Links
                umgehend entfernen.
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>03. Urheberrecht</strong>
                <br />
                Die durch uns erstellten Inhalte und Werke auf diesen Seiten
                unterliegen dem deutschen Urheberrecht. Die Vervielfältigung,
                Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb
                der Grenzen des Urheberrechtes bedürfen der schriftlichen
                Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und
                Kopien dieser Seite sind nur für den privaten, nicht
                kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser
                Seite nicht vom Betreiber erstellt wurden, werden die
                Urheberrechte Dritter beachtet. Insbesondere werden Inhalte
                Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine
                Urheberrechtsverletzung aufmerksam werden, bitten wir um einen
                entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen
                werden wir derartige Inhalte umgehend entfernen.
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Impressum;
