import { useEffect, useState } from 'react';
import { Section } from './styles';
import Input from '../../Forms/Input';
import Button from '../../Forms/Button';
import Error from '../../Helper/Error';
import useForm from '../../../Hooks/useForm';
import useFetch from '../../../Hooks/useFetch';
import { PHOTO_POST } from '../../../Api/index.js';
import { useNavigate } from 'react-router-dom';
import Head from '../../Helper/Head';

const UserPhotoPost = () => {
  const nome = useForm();
  const peso = useForm('number');
  const idade = useForm('number');
  const [img, setImg] = useState({});
  const { data, error, loading, request } = useFetch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('img', img.raw);
    formData.append('nome', nome.value);
    formData.append('peso', peso.value);
    formData.append('idade', idade.value);

    const { url, options } = PHOTO_POST(
      window.localStorage.getItem('token'),
      formData,
    );
    request(url, options);
  };
  const handleImgChange = ({ target }) => {
    setImg({
      preview: target.files[0] && URL.createObjectURL(target.files[0]),
      raw: target.files[0],
    });
  };
  useEffect(() => {
    if (data) navigate('/conta');
  }, [data, navigate]);

  return (
    <Section className="animeLeft container">
      <Head title="Poste sua foto" />
      <form onSubmit={handleSubmit} method="post">
        <Input label="Nome" type="text" name="nome" {...nome} />
        <Input label="Peso" type="number" name="peso" {...peso} />
        <Input label="Idade" type="number" name="idade" {...idade} />
        <input
          className="file"
          type="file"
          name="img"
          id="img"
          onChange={handleImgChange}
        />
        {loading ? (
          <Button disabled>Enviando...</Button>
        ) : (
          <Button>Enviar</Button>
        )}
        <Error error={error} />
      </form>{' '}
      <div>
        {img.preview && (
          <div
            className="preview"
            style={{ backgroundImage: `url(${img.preview})` }}></div>
        )}
      </div>
    </Section>
  );
};

export default UserPhotoPost;
