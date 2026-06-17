import '../../style/Offers.css'

const offers = [
  {
    id: 1,
    title: "Electronics Sale",
    description: "Up to 40% off on laptops, phones & accessories",
    discount: "40% OFF",
    badge: "Hot Deal",
    icon: "bi bi-laptop",
    bgColor: "#fff3cd",
    badgeColor: "#ff6b35",
  },
  {
    id: 2,
    title: "Fashion Week",
    description: "Buy 2 get 1 free on all clothing items",
    discount: "Buy 2 Get 1",
    badge: "Limited",
    icon: "bi bi-bag-heart",
    bgColor: "#f8d7da",
    badgeColor: "#e91e8c",
  },
  {
    id: 3,
    title: "Free Shipping",
    description: "Free delivery on all orders above ₹499",
    discount: "FREE",
    badge: "Always On",
    icon: "bi bi-truck",
    bgColor: "#d1ecf1",
    badgeColor: "#17a2b8",
  },
  {
    id: 4,
    title: "Home & Kitchen",
    description: "Flat 30% off on all home appliances",
    discount: "30% OFF",
    badge: "New",
    icon: "bi bi-house-heart",
    bgColor: "#d4edda",
    badgeColor: "#28a745",
  },
  {
    id: 5,
    title: "Sports & Fitness",
    description: "Get fit for less — 25% off on gym equipment",
    discount: "25% OFF",
    badge: "Trending",
    icon: "bi bi-bicycle",
    bgColor: "#e2d9f3",
    badgeColor: "#6f42c1",
  },
  {
    id: 6,
    title: "Flash Sale",
    description: "Every Friday — deals up to 60% off sitewide",
    discount: "60% OFF",
    badge: "Every Friday",
    icon: "bi bi-lightning-charge",
    bgColor: "#ffeeba",
    badgeColor: "#e0a800",
  },
];

function OffersSection() {
  return (
    <section className="offers-section py-5">
      <div className="container">

        {/* Section Header */}
        <div className="text-center mb-4">
          <h2 className="offers-title">🔥 Exclusive Offers</h2>
          <p className="offers-subtitle text-muted">
            Grab the best deals before they expire!
          </p>
        </div>

        {/* Offer Cards */}
        <div className="row g-4">
          {offers.map((offer) => (
            <div className="col-12 col-sm-6 col-lg-4" key={offer.id}>
              <div
                className="offer-card h-100 p-4 rounded-4 shadow-sm position-relative"
                style={{ backgroundColor: offer.bgColor }}
              >
                {/* Badge */}
                <span
                  className="offer-badge position-absolute top-0 end-0 m-3 px-2 py-1 rounded-pill text-white"
                  style={{ backgroundColor: offer.badgeColor, fontSize: '0.75rem' }}
                >
                  {offer.badge}
                </span>

                {/* Icon */}
                <div className="offer-icon mb-3">
                  <i
                    className={`${offer.icon} fs-1`}
                    style={{ color: offer.badgeColor }}
                  ></i>
                </div>

                {/* Discount Tag */}
                <h4
                  className="offer-discount fw-bold mb-1"
                  style={{ color: offer.badgeColor }}
                >
                  {offer.discount}
                </h4>

                {/* Title & Description */}
                <h5 className="offer-card-title fw-semibold">{offer.title}</h5>
                <p className="offer-card-desc text-muted mb-3">
                  {offer.description}
                </p>

                {/* CTA Button */}
                <button
                  className="btn btn-sm text-white fw-semibold"
                  style={{ backgroundColor: offer.badgeColor, border: 'none' }}
                >
                  Shop Now →
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default OffersSection;