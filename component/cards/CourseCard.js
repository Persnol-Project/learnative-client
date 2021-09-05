import { Card, Badge, Button } from "antd";
import { Tooltip } from "antd";
import Link from "next/link";
import { currencyFormatter } from "../../utils/helpers";
const { Meta } = Card;

const CourseCard = ({ course }) => {
  const { name, instructor, price, image, slug, paid, category } = course;
  return (
    <Link href={`/course/${slug}`}>
      <a>
        <Card
          className="mb-4 "
          cover={
            <img
              src={image.Location}
              alt={name}
              style={{
                height: "200px",
                objectFit: "cover",
              }}
              className="p-1"
            />
          }
        >
          <b>
            <h2>{name}</h2>
          </b>
          <Tooltip title="Instructor">
            <p
              style={{
                fontSize: "1rem",
                background: "#005499",
                color: "white",
                borderColor: "#2e47ff",
              }}
              className="btn btn-block getting-started"
            >
              {" "}
              by {instructor.name}
            </p>
          </Tooltip>
          <Tooltip title="Category">
            <Button
              type="primary"
              block
              shape="square"
              // count={category}
              style={{
                backgroundColor: "#2e47ff",
                border: "2px solid black",
                borderRadius: "10px",
                fontSize: "1.2rem",

                height: "45px",
              }}
              className="mb-2 mt-2 getting-started"
            >
              {category}
            </Button>
          </Tooltip>
          <b>
            <h4 className="pt-2">
              {paid
                ? currencyFormatter({
                    amount: price,
                    currency: "inr",
                  })
                : "Free"}
            </h4>
          </b>
        </Card>
      </a>
    </Link>
  );
};
export default CourseCard;
