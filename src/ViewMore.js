// ViewMore.js
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
        className="go-back-button"
      >
        <ArrowLeft className="icon-small" /> Go Back
      </button>

      {/* Header */}
      <div className="viewmore-header">
        <img
          src="https://i.pravatar.cc/150?img=56"
          alt="Profile"
          className="profile-image"
        />
        <div>
          <h1 className="profile-name">Irma Hane</h1>
          <p className="profile-email">Farouk@gmail.com</p>
        </div>
        <div className="header-actions">
          <button className="more-button">
            <MoreHorizontal className="icon-medium" />
          </button>
          <button className="portfolio-button">
            <span className="plus-icon">+</span> View portfolio
          </button>
        </div>
      </div>

      {/* Motivational Letter */}
      <div className="letter-section">
        <div>
          <h2 className="section-title">Motivational letter</h2>
          <p className="section-subtitle">Lorem Ipsum</p>
        </div>

        <div className="letter-highlight">
          Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend
          faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna,
          etiam. Mauris posuere.
        </div>

        <div className="letter-content">
          <h3 className="letter-subtitle">LoremIpsum</h3>
          <p>
            Dolor enim eu tortor urna sed duis nulla. Aliquam vestibulum, nulla odio nisl vitae. In
            aliquet pellentesque aenean hac vestibulum turpis mi bibendum diam. Tempor integer
            aliquam in vitae malesuada fringilla. Elit nisi in eleifend sed nisi. Pulvinar at orci,
            proin imperdiet commodo consectetur convallis risus.
          </p>
          <ul className="letter-list">
            <li>
              Ipsum sit mattis nulla quam nulla. Gravida id gravida ac enim mauris id. Diam elit,
              orci, tincidunt aenean tempus. Quis velit eget ut tortor tellus. Sed vel, congue felis
              elit erat nam nibh orci.
            </li>
            <li>Non pellentesque congue eget consectetur turpis.</li>
            <li>
              Sapien, dictum molestie sem tempor. Diam elit, orci, tincidunt aenean tempus. Quis
              velit eget ut tortor tellus. Sed vel, congue felis elit erat nam nibh orci.
            </li>
          </ul>

          <h3 className="letter-subtitle">LoremIpsum</h3>
          <p>
            Ipsum sit mattis nulla quam nulla. Gravida id gravida ac enim mauris id. Non
            pellentesque congue eget consectetur turpis. Sapien, dictum molestie sem tempor. Diam
            elit, orci, tincidunt aenean tempus. Quis velit eget ut tortor tellus. Sed vel, congue
            felis elit erat nam nibh orci.
          </p>
          <p>
            Dolor enim eu tortor urna sed duis nulla. Aliquam vestibulum, nulla odio nisl vitae. In
            aliquet pellentesque aenean hac vestibulum turpis mi bibendum diam. Tempor integer
            aliquam in vitae malesuada fringilla.
          </p>
          <p>
            Elit nisi in eleifend sed nisi. Pulvinar at orci, proin imperdiet commodo consectetur
            convallis risus. Sed condimentum enim dignissim adipiscing faucibus consequat, urna.
            Viverra purus et erat auctor aliquam. Risus, volutpat vulputate posuere purus sit congue
            convallis aliquet. Arcu id augue ut feugiat donec porttitor neque. Mauris, neque
            ultricies eu vestibulum, bibendum quam lorem id. Dolor lacus, eget nunc lectus in
            tellus, pharetra, porttitor.
          </p>

          <h3 className="letter-subtitle">What does success look like?</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque tellus vel pretium
            posuere. Id maecenas a tristique in fusce hendrerit. Amet, mattis in vitae, est urna,
            diam. Ante fringilla nulla at sed tincidunt. Et aliquam neque cras mauris non bibendum.
            Hac ut ridiculus enim urna felis amet. Dolor aliquam diam suspendisse non elit faucibus
            id orci, mi.
          </p>
          <p>
            Pharetra nam gravida commodo accumsan sapien aliquet bibendum purus nunc. Quam cursus at
            eu, aliquam integer. Accumsan, nisi ultricies ut pulvinar fames neque risus. Eu et,
            elementum leo amet bibendum gravida vitae ridiculus.
          </p>
        </div>
      </div>
    </div>
  );
}
