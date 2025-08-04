const StarRating = ({rating,maxStars}) => {
    const fullStars = Math.floor(rating);
    const hasHalf = rating - fullStars >= 0.5;
    const emptyStars = maxStars - fullStars - (hasHalf ? 1 : 0);
    return(
        <span>
            {[...Array(fullStars)].map((_, i) => (
                <span key={"full" + i} style={{ color: "#FFD700" }}>★</span>
            ))}
            {hasHalf && <span style={{ color: "#FFD700" }}>☆</span>}
            {[...Array(emptyStars)].map((_, i) => (
                <span key={"empty" + i} style={{ color: "#DDD" }}>★</span>
            ))}

        </span>
    )

}
export default StarRating;