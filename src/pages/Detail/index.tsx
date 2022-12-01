import { FC, ReactElement, useMemo } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  type?: 'create' | 'edit';
}

const Detail: FC<Props> = ({ type }: Props): ReactElement => {
  const text = useMemo(() => {
    switch (type) {
      case 'create':
        return 'Create';
      case 'edit':
        return 'Edit';
      default:
        return 'Detail';
    }
  }, [type]);

  return (
    <>
      <div>{text}</div>
      <Link to="/">Home</Link>
    </>
  );
};

export default Detail;
