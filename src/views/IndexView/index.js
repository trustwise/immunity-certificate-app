
import React from "react";


const IndexView = () => (
  <div className="row">
    <div className="column">
      <h3 className="sub-title">Blockchain-secured Proof of Immunity</h3>
      <div className="text-align-left limit-width centered">
        <hr />
        <h4>Why?</h4>
        <ul>
          <li>Speed up economic recovery by allowing Covid19 immune (and non-contagious) persons to return to business or helping others and to reduce infection anxieties.</li>
          <li>Minimise risk of fraud and cost of paper-based certificates by securing immunity test results on a blockchain.</li>
        </ul>
        <hr />
        <h4>Is it feasible?</h4>
        <ul>
          <li>Yes, tests that allow to identify Covid19 antibodies (of subtype IgG) of an immune and probably non-contagious person are about to enter the market.</li>
        </ul>
        <hr />
        <h4>Advantages of blockchain</h4>
        <ul>
          <li>No costly paper certificates</li>
          <li>Anyone with a mobile phone and a camera can check on the Covid19 immunity of a person and compare it with the Passport ID</li>
          <li>Testers are registered on the blockchain by health authorities before they can issue certificates.</li>
          <li>Risk of issuing wrong certificates minimised (as there is a high discovery risk for testers who tamper with the results)</li>
          <li>Certificates can be revoked easily by health authorities, if they prove wrong or a person becomes ill again.</li>
          <li>No privacy risks as passport number is secured by an individual security code.</li>
        </ul>
        <hr />
      </div>
    </div>
  </div>
);


export default IndexView;
