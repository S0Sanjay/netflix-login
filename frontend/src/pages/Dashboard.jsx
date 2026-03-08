import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import logo from "../assets/logo.png";

const GENRES = [
  {
    title: "Trending Now",
    shows: [
      {
        title: "Stranger Things",
        rating: "16+",
        seasons: "4 Seasons",
        image: "/src/assets/stranger-things.jpg",
      },
      {
        title: "The Crown",
        rating: "15+",
        seasons: "6 Seasons",
        image: "/src/assets/the-crown.jpg",
      },
      {
        title: "Wednesday",
        rating: "15+",
        seasons: "2 Seasons",
        image: "/src/assets/wednesday.jpg",
      },
      {
        title: "Squid Game",
        rating: "18+",
        seasons: "2 Seasons",
        image: "/src/assets/squid-game.jpg",
      },
      {
        title: "Narcos",
        rating: "18+",
        seasons: "3 Seasons",
        image: "/src/assets/narcos.jpg",
      },
      {
        title: "Dark",
        rating: "16+",
        seasons: "3 Seasons",
        image: "/src/assets/dark.jpg",
      },
    ],
  },
  {
    title: "Continue Watching",
    shows: [
      {
        title: "Ozark",
        rating: "18+",
        seasons: "4 Seasons",
        image: "/src/assets/ozark.jpg",
      },
      {
        title: "Money Heist",
        rating: "15+",
        seasons: "5 Seasons",
        image: "/src/assets/money-heist.jpg",
      },
      {
        title: "Breaking Bad",
        rating: "18+",
        seasons: "5 Seasons",
        image: "/src/assets/breaking-bad.jpg",
      },
      {
        title: "Mindhunter",
        rating: "18+",
        seasons: "2 Seasons",
        image: "/src/assets/mind-hunter.jpg",
      },
      {
        title: "The Witcher",
        rating: "16+",
        seasons: "3 Seasons",
        image: "/src/assets/the-witcher.jpg",
      },
    ],
  },
  {
    title: "Top Picks For You",
    shows: [
      {
        title: "Black Mirror",
        rating: "18+",
        seasons: "6 Seasons",
        image: "/src/assets/black-mirror.jpg",
      },
      {
        title: "Peaky Blinders",
        rating: "18+",
        seasons: "6 Seasons",
        image: "/src/assets/peaky-blinders.jpg",
      },
      {
        title: "Cobra Kai",
        rating: "15+",
        seasons: "6 Seasons",
        image: "/src/assets/cobra-kai.jpg",
      },
      {
        title: "Emily in Paris",
        rating: "13+",
        seasons: "4 Seasons",
        image: "/src/assets/emily-in-paris.jpg",
      },
      {
        title: "You",
        rating: "18+",
        seasons: "4 Seasons",
        image: "/src/assets/you.jpg",
      },
    ],
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSignOutModal, setShowSignOutModal] = useState(false);

  const [navVisible, setNavVisible] = useState(true);
  const [navSolid, setNavSolid] = useState(false);
  const lastScrollY = useRef(0);

  const handleScroll = useCallback(() => {
    const currentY = window.scrollY;
    if (currentY < 10) {
      setNavVisible(true);
      setNavSolid(false);
    } else if (currentY > lastScrollY.current) {
      setNavVisible(false);
    } else {
      setNavVisible(true);
      setNavSolid(true);
    }
    lastScrollY.current = currentY;
  }, []);

  useEffect(() => {
    const stored = sessionStorage.getItem("user");
    if (!stored) {
      navigate("/login");
      return;
    }
    setUser(JSON.parse(stored));
  }, [navigate]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const close = (e) => {
      if (!e.target.closest(".profile-menu")) setDropdownOpen(false);
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const confirmSignOut = () => {
    sessionStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="dashboard">
      {showSignOutModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowSignOutModal(false)}
        >
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">Sign out of Netflix?</h2>
            <p className="modal-desc">
              You will be redirected to the login page.
            </p>
            <div className="modal-actions">
              <button
                className="modal-cancel"
                onClick={() => setShowSignOutModal(false)}
              >
                Cancel
              </button>
              <button className="modal-confirm" onClick={confirmSignOut}>
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      <nav
        className={`dash-nav ${navVisible ? "nav-visible" : "nav-hidden"} ${navSolid ? "nav-solid" : ""}`}
      >
        <div className="dash-nav-left">
          <div className="nav-logo">
            <img src={logo} alt="Netflix" />
          </div>
          <ul className="nav-links">
            {["Home", "TV Shows", "Movies", "New & Popular", "My List"].map(
              (link) => (
                <li key={link}>
                  <a href="#">{link}</a>
                </li>
              ),
            )}
          </ul>
        </div>
        <div className="dash-nav-right">
          <div
            className="profile-menu"
            onClick={(e) => {
              e.stopPropagation();
              setDropdownOpen((v) => !v);
            }}
          >
            <div className="profile-avatar">{user.name?.[0].toUpperCase()}</div>
            <svg
              className={`caret ${dropdownOpen ? "open" : ""}`}
              viewBox="0 0 24 24"
              fill="currentColor"
              width="14"
              height="14"
            >
              <path d="M7 10l5 5 5-5z" />
            </svg>
            {dropdownOpen && (
              <div className="profile-dropdown">
                <a href="#">Manage Profiles</a>
                <a href="#">Account</a>
                <a href="#">Help Centre</a>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setDropdownOpen(false);
                    setShowSignOutModal(true);
                  }}
                >
                  Sign out of Netflix
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <section className="hero-banner">
        <div className="hero-gradient-bottom" />
        <div className="hero-content">
          <div className="hero-badge">N SERIES</div>
          <h1 className="hero-title">
            Stranger
            <br />
            Things
          </h1>
          <p className="hero-desc">
            When a boy vanishes, a small town uncovers a mystery involving
            secret experiments, terrifying supernatural forces, and one strange
            little girl.
          </p>
          <div className="hero-btns">
            <button className="hero-play-btn">▶ Play</button>
            <button className="hero-info-btn">ℹ More Info</button>
          </div>
        </div>
      </section>

      <section className="content-section">
        <p className="welcome-msg">
          Welcome back, <strong>{user.name}</strong> 👋
        </p>

        {GENRES.map((genre) => (
          <div key={genre.title} className="content-row">
            <h2 className="row-title">{genre.title}</h2>
            <div className="cards-scroll-wrapper">
              <div className="cards-container">
                {genre.shows.map((show, idx) => (
                  <div
                    key={show.title}
                    className={`show-card ${hoveredCard === `${genre.title}-${idx}` ? "hovered" : ""}`}
                    onMouseEnter={() => setHoveredCard(`${genre.title}-${idx}`)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div className="card-thumb">
                      <img src={show.image} alt={show.title} />
                      <span className="card-title-thumb">{show.title}</span>
                    </div>
                    <div className="card-hover-overlay">
                      <div className="card-actions">
                        <button className="card-play-btn">▶</button>
                        <button className="card-add-btn">+</button>
                      </div>
                      <div className="card-meta">
                        <span className="card-match">97% Match</span>
                        <span className="card-rating">{show.rating}</span>
                        <span className="card-seasons">{show.seasons}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
