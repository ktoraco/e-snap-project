import { FC } from 'react';

type InfoTerminalProps = {
    gameInfo: string;
    photoInfo: string;
};

const InfoTerminal: FC<InfoTerminalProps> = ({ gameInfo, photoInfo }) => {
    return (
        <div className='bg-black'>
         <p>{gameInfo}</p>
         <p>{photoInfo}</p>
        </div>
    );
};

export default InfoTerminal;