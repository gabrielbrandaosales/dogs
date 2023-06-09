import { useContext } from 'react';
import { Section } from './styles';
import { Route, Routes } from 'react-router-dom';
import Feed from '../Feed';
import UserHeader from './UserHeader';
import UserPhotoPost from './UserPhotoPost';
import UserStats from './UserStats';
import { UserContext } from '../../UserContext';
import NotFound from '../NotFound';
import Head from '../Helper/Head';

const User = () => {
  const { data } = useContext(UserContext);
  return (
    <Section>
      <Head title="Minha conta" />;
      <UserHeader />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Feed user={data.id} />} />
        <Route path="/post" element={<UserPhotoPost />} />
        <Route path="/stats" element={<UserStats />} />
      </Routes>
    </Section>
  );
};

export default User;
