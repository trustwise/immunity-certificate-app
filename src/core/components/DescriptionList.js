import React, { Fragment } from "react";


const DescriptionList = ({ data }) => {
  if (!data || !data.length) {
    return null;
  }
  return (
    <dl>
      {data.map(
        ([label, value]) => (
          <Fragment key={label}>
            <dd>{label}</dd>
            <dt>{value}</dt>
          </Fragment>
        )
      )}
    </dl>
  );
};

export default DescriptionList;
