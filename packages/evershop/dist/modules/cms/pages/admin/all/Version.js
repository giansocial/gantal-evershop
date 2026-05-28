import PropTypes from 'prop-types';
import React from 'react';
export default function Version({ version }) {
    return /*#__PURE__*/ React.createElement("div", {
        className: "version"
    }, /*#__PURE__*/ React.createElement("span", null, "Version ", version));
}
Version.propTypes = {
    version: PropTypes.string.isRequired
};
export const layout = {
    areaId: 'footerLeft',
    sortOrder: 20
};
export const query = `
  query query {
    version
  }
`;
