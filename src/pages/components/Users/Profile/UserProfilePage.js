import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
// @mui
import { Tab, Card, Tabs, Container, Box } from '@mui/material';
// routes
// auth
// _mock_

// components
// sections
import {
  Profile,
  ProfileCover,
  ProfileFriends,
  ProfileGallery,
} from 'src/sections/@dashboard/user/profile';
import { useSettingsContext } from 'src/components/settings';
import { ProfileFollowers } from 'src/sections/@dashboard/user/profile';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import Iconify from 'src/components/iconify';
import {
  _userFollowers, _userAbout,
  _userFeeds,
  _userFriends,
  _userGallery,
} from 'src/_mock/arrays';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { useAuthContext } from 'src/auth/useAuthContext';
import OrderListPage from './OrderListPage';
import { useLocation } from 'react-router';

// ----------------------------------------------------------------------

export default function UserProfilePage() {
  const { themeStretch } = useSettingsContext();

  const { user } = useAuthContext();
  const location = useLocation();
  
  const params = location.state?.params;  // Retrieve the params you passed
  
  console.log(params?.user?.role?.name);  // Log params to check
  const [searchFriends, setSearchFriends] = useState('');

  const [currentTab, setCurrentTab] = useState('profile');

  const TABS = [
    {
      value: 'profile',
      label: 'Profile',
      icon: <Iconify icon="ic:round-account-box" />,
      component: <Profile info={_userAbout} posts={_userFeeds} />,
    },
    {
      value: 'cart',
      label: 'cart',
      icon: <Iconify icon="mdi:cart" />,
      component: <ProfileFollowers followers={_userFollowers} />,
    },
    {
      value: 'fav',
      label: 'fav',
      icon: <Iconify icon="mdi:favorite" />,
      component: (
        <ProfileFriends
          friends={_userFriends}
          searchFriends={searchFriends}
          onSearchFriends={(event) => setSearchFriends(event.target.value)}
        />
      ),
    },
    {
      value: 'order',
      label: 'order',
      icon: <Iconify icon="mdi:order-bool-descending-variant" />,
      component: <OrderListPage gallery={_userGallery} />,
    },
  ];

  const MANGERTABS = [
    {
      value: 'profile',
      label: 'Profile',
      icon: <Iconify icon="ic:round-account-box" />,
      component: <Profile info={_userAbout} posts={_userFeeds} />,
    },
    {
      value: 'cart',
      label: 'cart',
      icon: <Iconify icon="mdi:cart" />,
      component: <ProfileFollowers followers={_userFollowers} />,
    },
    {
      value: 'fav',
      label: 'fav',
      icon: <Iconify icon="mdi:favorite" />,
      component: (
        <ProfileFriends
          friends={_userFriends}
          searchFriends={searchFriends}
          onSearchFriends={(event) => setSearchFriends(event.target.value)}
        />
      ),
    },
  ];

  // Check if the user role is 'MANGER' and select the appropriate tabs
  const isManager = params?.user?.role?.name === 'manager';
  const tabsToDisplay = isManager ? MANGERTABS : TABS;  // Conditionally choose the tabs

  return (
    <>
      <Helmet>
        <title> User: Profile | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Profile"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'User', href: PATH_DASHBOARD.user.root },
            { name: user?.displayName },
          ]}
        />
        <Card
          sx={{
            mb: 3,
            height: 280,
            position: 'relative',
          }}
        >
          <ProfileCover name={user?.displayName} role={_userAbout.role} cover={_userAbout.cover} />

          <Tabs
            value={currentTab}
            onChange={(event, newValue) => setCurrentTab(newValue)}
            sx={{
              width: 1,
              bottom: 0,
              zIndex: 9,
              position: 'absolute',
              bgcolor: 'background.paper',
              '& .MuiTabs-flexContainer': {
                pr: { md: 3 },
                justifyContent: {
                  sm: 'center',
                  md: 'flex-end',
                },
              },
            }}
          >
            {tabsToDisplay.map((tab) => (
              <Tab key={tab.value} value={tab.value} icon={tab.icon} label={tab.label} />
            ))}
          </Tabs>
        </Card>

        {tabsToDisplay.map(
          (tab) => tab.value === currentTab && <Box key={tab.value}> {tab.component} </Box>
        )}
      </Container>
    </>
  );
}
