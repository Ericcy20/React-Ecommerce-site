import { Container } from "react-bootstrap";

const Brands = () => {
  const photos = [
  ];

  return (
    <div>
      <Container>
        <div className="row p-5 justify-content-center align-items-center d-md-none d-sm-none d-lg-flex">
          {photos.map((photo) => (
            <div
              className="col-lg-3 p-3 d-flex flex-row  justify-content-center align-items-center "
              key={photo.id}
            >
              <div>
                <img src={photo.image} alt={photo.name} className=" h-100" />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Brands;
