import React from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import logo from "../../img/logo/GS-03.png";
import  Link  from "next/link";
import Image from 'next/image'
function HeaderUser() {
  const [menuopen, setMenuopen] = React.useState(false);

  return (
    <header className="header">
      <section className="container">
        <div className="wrapper d-flex justify-content-between align-items-center">
          <div className="right-menu">
            <Link href="/" className="brand">
                <a>
                    <Image src={logo} />
                </a>
            </Link>
            <button
              type="button"
              className="burger"
              id="burger"
              onClick={(e) => setMenuopen(!menuopen)}
              aria-label="open menu"
            >
              <span className="burger-line"></span>
              <span className="burger-line"></span>
              <span className="burger-line"></span>
              <span className="burger-line"></span>
            </button>
            <span className="overlay" id="overlay"></span>
            <Offcanvas
              show={menuopen}
              onHide={(e) => setMenuopen(false)}
              placement={"end"}
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>Offcanvas</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <ul className="menu">
                  <li className="menu-item">
                    <a href="#">
                      {" "}
                      <i className="bi bi-house-door-fill"></i>{" "}
                    </a>
                  </li>
                  <li className="menu-item">
                    <a href="#">گیفت کارت</a>
                  </li>
                  <li className="menu-item">
                    <Link href="/Purchase-report">
                        <a>تماس با ما</a>
                    </Link>
                  </li>
                  <li className="menu-item menu-item-child">
                    <a href="#" data-toggle="sub-menu">
                      درباره ما
                      
                    </a>
                  </li>
                  <li className="menu-item menu-item-child">
                    <a href="#" data-toggle="sub-menu">
                      تماس با ما{" "}
                    </a>
                  </li>
                  <li className="menu-item menu-item-child">
                    <a href="#" data-toggle="sub-menu">
                      بلاگ{" "}
                    </a>
                  </li>
                </ul>
                <div className="left-mennu-res">
                  <div className="search-bar">
                    <form action="#">
                      <input type="text" name="" id="" placeholder=" " />
                      <button>
                        <i className="bi bi-search"></i>
                      </button>
                    </form>
                  </div>
                  <div className="basket-shop">
                    <a href="#">
                      <i className="bi bi-bag"></i>
                    </a>
                  </div>
                  <div className="user">
                    <a href="#">
                      <i className="bi bi-person"></i>
                    </a>
                  </div>
                </div>
              </Offcanvas.Body>
            </Offcanvas>
            <nav className={"navbar navbar-expand-lg navbar-light bg-light"} id="navbar">
              <ul className="menu">
                <li className="menu-item">
                  <a href="#">
                    {" "}
                    <i className="bi bi-house-door-fill"></i>{" "}
                  </a>
                </li>
                <li className="menu-item">
                  <a href="#">گیفت کارت</a>
                </li>
                <li className="menu-item menu-item-child">
                  <a href="#" data-toggle="sub-menu">
                    درباره ما
                    {/* <i className="expand"></i>  */}
                  </a>
                  {/* <ul className="sub-menu">
                        <li className="menu-item"><a href="#">Web Design</a></li>
                        <li className="menu-item"><a href="#">Web Development</a></li>
                        <li className="menu-item"><a href="#">Brand Marketing</a></li>
                        <li className="menu-item"><a href="#">SEO and Optimizing</a></li>
                     </ul>  */}
                </li>
                <li className="menu-item menu-item-child">
                  <a href="#" data-toggle="sub-menu">
                    تماس با ما{" "}
                  </a>
                </li>
                <li className="menu-item menu-item-child">
                  <a href="#" data-toggle="sub-menu">
                    بلاگ{" "}
                  </a>
                </li>
              </ul>
              <div className="left-mennu-res">
                <div className="search-bar">
                  <form action="#">
                    <input type="text" name="" id="" placeholder=" " />
                    <button>
                      <i className="bi bi-search"></i>
                    </button>
                  </form>
                </div>
                <div className="basket-shop">
                  <a href="#">
                    <i className="bi bi-bag"></i>
                  </a>
                </div>
                <div className="user">
                  <a href="#">
                    <i className="bi bi-person"></i>
                  </a>
                </div>
              </div>
            </nav>
          </div>
          <div className="left-mennu">
            <div className="search-bar">
              <form action="#">
                <input type="text" name="" id="" placeholder=" " />
                <button>
                  <i className="bi bi-search"></i>
                </button>
              </form>
            </div>
            <div className="basket-shop">
              <a href="#">
                <i className="bi bi-bag"></i>
              </a>
            </div>
            <div className="user">
              <a href="#">
                <i className="bi bi-person"></i>
              </a>
            </div>
          </div>
        </div>
      </section>
    </header>
  );
}

export default HeaderUser;
