import React from 'react';
export default function CopyRight({ themeConfig: { copyRight } }) {
    return /*#__PURE__*/ React.createElement("div", {
        className: "copyright"
    }, /*#__PURE__*/ React.createElement("span", null, copyRight));
}
CopyRight.defaultProps = {
    themeConfig: {
        copyRight: '© 2025 Evershop. All Rights Reserved.'
    }
};
export const layout = {
    areaId: 'footerLeft',
    sortOrder: 10
};
export const query = `
  query query {
    themeConfig {
      copyRight
    }
  }
`;
