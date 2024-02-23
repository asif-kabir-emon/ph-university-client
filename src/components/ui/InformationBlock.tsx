interface IInformationBlock {
    header: string;
    text: string;
}

const InformationBlock = (params: IInformationBlock) => {
    return (
        <div className="text-base mb-5">
            <div className="font-bold text-[16px]">{params.header}</div>
            <div className="text-[16px]">{params.text || 'N/A'}</div>
        </div>
    );
};

export default InformationBlock;
