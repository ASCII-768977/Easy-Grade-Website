import React from 'react';
import { connect } from 'react-redux';
import { State } from '../../types/state';
import { LayoutProps } from '../../types';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

const mapStateToProps = (state: State) => ({
  collapsed: state.layout.navCollapsed,
});

const Layout: React.FC<LayoutProps> = (props) => {
  const { collapsed, breadNavs, children } = props;

  return (
    <div className={`site-layout ${collapsed ? 'site-layout-collapsed' : ''}`}>
      <Breadcrumb>
        {breadNavs.map(
          (item, index) =>
            item.title !== '' && (
              <Breadcrumb.Item key={item.title + index}>
                <Link to={item.path}>{item.title}</Link>
              </Breadcrumb.Item>
            ),
        )}
      </Breadcrumb>
      {children}
    </div>
  );
};

export default connect(mapStateToProps)(Layout);
