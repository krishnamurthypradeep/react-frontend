import StarRating from "./starRating.jsx";
import {Link} from "react-router-dom";

const Product = ({p,show}) => {
    return (
        <tr key={p.id} className="border-bottom">
            <td>
                {show?
                    <img src={p.imageUrl} style={{width: "50px", height: "50px"}} className="img-thumbnail"
                         alt={p.name}/>: null}
            </td>
            <td className="fw-semibold">
                <Link to={`/products/${p.id}`}>{p.name}</Link></td>
            <td>{p.price.toFixed(2)}</td>
            <td>{p.description}</td>
            <td>
            <span className={p.productAvailable ? "text-success fw-bold" : "text-danger fw-bold"}>
              {p.productAvailable ? "Yes" : "No"}
            </span>
            </td>
            <td>
                <StarRating rating={p.starRating} maxStars={5}/>
            </td>
        </tr>

    )
}
export default Product;