import React, { useMemo, useState } from 'react';
import { withRouter } from 'react-router';
import { Link, useHistory, RouteComponentProps } from 'react-router-dom';
import { MenuUnfoldOutlined, MenuFoldOutlined, CloseCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, Popover } from 'antd';
import './MainNav.scss';
import logoIcon from '../../assets/img/logo_icon.svg';
import accountIcon from '../../assets/img/account_icon.svg';
import { State } from '../../types/state';
import { connect, useDispatch } from 'react-redux';
import { storeNavCollapsed } from '../../store/actions/actionCreator';
import { MainNavProps } from '../../types';
import { storeUserLogout } from '../../store/actions/account';

const { Sider } = Layout;

const mapStateToProps = (state: State) => ({
  collapsed: state.layout.navCollapsed,
});

const AccountPopover = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogOut = () => {
    dispatch(storeUserLogout());
    sessionStorage.removeItem('user');
    history.push('/');
  };

  return (
    <>
      <Link to="/account">
        <Button type="primary" icon={<UserOutlined />}>
          Edit Account
        </Button>
      </Link>
      <Button type="primary" icon={<CloseCircleOutlined />} onClick={handleLogOut}>
        Log Out
      </Button>
    </>
  );
};

const MainNav: React.FC<MainNavProps & RouteComponentProps> = (props) => {
  const { collapsed, title, description, navLinks, location, match } = props;
  const dispatch = useDispatch();
  const { url } = match;

  const [selected, setSelected] = useState(['Dashboard']);

  useMemo(() => {
    const pathArr = location.pathname.split('/');
    if (pathArr.length >= 4) {
      setSelected([`/${pathArr[3]}`]);
    }
  }, [location]);

  return (
    <Sider className="main-nav" trigger={null} breakpoint="lg" width={240} collapsible collapsed={collapsed}>
      <div>
        <div className={`main-nav__top ${collapsed ? 'main-nav-top-collapsed' : ''}`}>
          <Menu className="main-nav__logo" theme="dark">
            <Menu.Item icon={<img src={logoIcon} alt="logo" />}>
              <Link to="/">EasyGrade</Link>
            </Menu.Item>
          </Menu>
          {collapsed && (
            <div className="main-nav__show-btn">
              <MenuUnfoldOutlined
                onClick={() => {
                  dispatch(storeNavCollapsed(false));
                }}
              />
            </div>
          )}
          {collapsed || (
            <MenuFoldOutlined
              onClick={() => {
                dispatch(storeNavCollapsed(true));
              }}
            />
          )}
          <div className={`main-nav__info ${navLinks.length === 0 ? '' : 'main-nav__info-border'}`}>
            <div className="main-nav__info-text">
              <h4>{title}</h4>
              <p>{description}</p>
            </div>
          </div>
        </div>

        <Menu className="main-nav__center" theme="dark" defaultSelectedKeys={['Dashboard']} selectedKeys={selected}>
          {navLinks.map((item) => (
            <Menu.Item key={item.path} icon={item.icon}>
              <Link to={`${url}${item.path}`}>{item.title}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </div>

      <Popover
        placement="topLeft"
        title={''}
        content={AccountPopover}
        trigger="click"
        getPopupContainer={(triggerNode) => triggerNode}
      >
        <Menu className="main-nav__bottom" theme="dark">
          <Menu.Item
            icon={<img src={accountIcon} alt="logo" />}
            onClick={() => {
              dispatch(storeNavCollapsed(false));
            }}
          >
            Account
          </Menu.Item>
        </Menu>
      </Popover>
    </Sider>
  );
};

export default withRouter(connect(mapStateToProps)(MainNav));
