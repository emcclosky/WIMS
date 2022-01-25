import dayjs from 'dayjs'
import styles from "./ProductCard.module.scss";

type ProductProps = {
  name: string;
  image: string;
  url: string;
  available: boolean | null;
  updated: string;
}

function ProductCard(props: ProductProps) {
  const dateUpdated  = dayjs(props.updated).format('MM/DD/YYYY hh:mm A');

  return (
    <div className={styles.card}>
      <a className={styles.image_link} href={props.url}>
        <div className={ styles.fluid_image}>
          <img className={ styles.image } src={props.image} alt={props.name} />
        </div>
      </a>
      <div className={styles.details}>
        <div className={styles.content}>
          <h3 className={styles.title}>
            <a className={styles.link} href={props.url}>{props.name}</a>
          </h3>
          <span className={styles.date}>Last Updated: {dateUpdated}</span>
        </div>
        <span className={[styles.status_tag, props.available ? styles.alert_in : styles.alert_out ].join(' ')}>
          { props.available ? 'In Stock' : 'Out of Stock' }
        </span>
      </div>
    </div>
  )
}

export default ProductCard;