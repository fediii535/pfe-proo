import React from "react";
import { ArrowLeft, MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./ViewMore.css";

export default function ViewMore() {
  const navigate = useNavigate();

  return (
    <div className="viewmore-container">
      {/* Go Back */}
      <button
        onClick={() => navigate(-1)}
        className="go-back-btn"
      >
        <ArrowLeft className="icon-small" /> Go Back
      </button>

      {/* Header */}
      <div className="header">
        <img
          src="https://i.pravatar.cc/150?img=56"
          alt="Profile"
          className="profile-pic"
        />
        <div>
          <h1 className="profile-name">Irma Hane</h1>
          <p className="profile-email">Farouk@gmail.com</p>
        </div>
        <div className="header-actions">
          <button className="action-btn">
            <MoreHorizontal className="icon-medium" />
          </button>
          <button className="portfolio-btn">
            <span className="portfolio-plus">+</span> View portfolio
          </button>
        </div>
      </div>

      {/* Motivational Letter */}
      <div className="letter-container">
        <div>
          <h2 className="letter-title">Motivational letter</h2>
          <p className="letter-subtitle">Lorem Ipsum</p>
        </div>

        <div className="letter-highlight">
          Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend
          faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna,
          etiam. Mauris posuere.
        </div>

        <div className="letter-content">
          <h3>LoremIpsum</h3>
          <p>
            Dolor enim eu tortor urna sed duis nulla. Aliquam vestibulum, nulla odio nisl vitae. In
            aliquet pellentesque aenean hac vestibulum turpis mi bibendum diam. Tempor integer
            aliquam in vitae malesuada fringilla.
          </p>
          <ul>
            <li>
              Ipsum sit mattis nulla quam nulla. Gravida id gravida ac enim mauris id.Diam elit,
              orci, tincidunt aenean tempus. Quis velit eget ut tortor tellus. Sed vel, congue felis
              elit erat nam nibh orci.
            </li>
            <li>Non pellentesque congue eget consectetur turpis.</li>
            <li>
              Sapien, dictum molestie sem tempor. Diam elit, orci, tincidunt aenean tempus. Quis
              velit eget ut tortor tellus. Sed vel, congue felis elit erat nam nibh orci.
            </li>
          </ul>

          <h3>LoremIpsum</h3>
          <p>
            Ipsum sit mattis nulla quam nulla. Gravida id gravida ac enim mauris id. Non
            pellentesque congue eget consectetur turpis. Sapien, dictum molestie sem tempor.
          </p>
          <p>
            Dolor enim eu tortor urna sed duis nulla. Aliquam vestibulum, nulla odio nisl vitae. In
            aliquet pellentesque aenean hac vestibulum turpis mi bibendum diam.
          </p>
          <p>
            Elit nisi in eleifend sed nisi. Pulvinar at orci, proin imperdiet commodo consectetur
            convallis risus.
          </p>

          <h3>What does success look like?</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque tellus vel pretium
            posuere. Id maecenas a tristique in fusce hendrerit.
          </p>
          <p>
            Pharetra nam gravida commodo accumsan sapien aliquet bibendum purus nunc. Quam cursus at
            eu, aliquam integer.
          </p>
        </div>
      </div>
    </div>
  );
}
