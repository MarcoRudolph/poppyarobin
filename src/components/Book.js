import { Card, Button, Image } from 'react-bootstrap';

const BookPresentation = (props) => {
    const { title, image, description, date} = props.book;
    return (
        <Card className="book-card col-2">
            <Image src={image} className="book-img" />
            <Card.Body style={{ opacity:"0.7"}}>
                <Card.Title className="book-title">{title}</Card.Title>
                <Card.Subtitle className="book-author">Erschienen am {date}</Card.Subtitle>
                <Card.Text className="book-description">{description}</Card.Text>
                <Button variant="primary" className="book-buy-button">Auch auf Amazon</Button>
            </Card.Body>
        </Card>
    )
}

export default BookPresentation;