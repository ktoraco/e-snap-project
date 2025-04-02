import { FC } from 'react';

type GameTitleProps = {
    title: string;
};

const GameTitle: FC<GameTitleProps> = ({ title }) => {
    return <h1>{title}</h1>;
};

export default GameTitle;