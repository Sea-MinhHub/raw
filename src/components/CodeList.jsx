import React from 'react';
import styled from 'styled-components';

const ListContainer = styled.div`
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    margin-top: 10px;
`;

const RawItem = styled.div`
    padding: 12px;
    border-bottom: 1px dashed #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:last-child {
        border-bottom: none;
    }
`;

const RawInfo = styled.span`
    flex-grow: 1;
    text-align: left;
`;

const Button = styled.button`
    margin-left: 8px;
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.2s;
    background: ${props => props.danger ? '#ffcccc' : '#e7e7e7'};
    border: 1px solid ${props => props.danger ? '#f44336' : '#ccc'};

    &:hover {
        opacity: 0.8;
    }
`;

export default function CodeList({ raws, onDelete, onShowModal }) {

    const copyRawLink = (rawId) => {
        const link = `${window.location.origin}/raw/${rawId}`;
        navigator.clipboard.writeText(link).then(() => {
            alert("Đã copy link: " + link);
        }, (err) => {
            console.error('Không thể copy text: ', err);
            alert("Lỗi khi copy link. Vui lòng copy thủ công: " + link);
        });
    };
    
    const showModalContent = (raw) => {
        onShowModal({ visible: true, id: raw.rawId, content: raw.code });
    };

    return (
        <ListContainer>
            {raws.length === 0 ? (
                <RawItem>Chưa có raw code nào được tạo.</RawItem>
            ) : (
                raws.map((raw) => (
                    <RawItem key={raw.id}>
                        <RawInfo>
                            <a href="#" onClick={(e) => { e.preventDefault(); showModalContent(raw); }} style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}>
                                [{raw.isPublic ? 'Công Khai' : 'Riêng Tư'}] ID: {raw.rawId} 
                            </a>
                            <span style={{ color: '#999', fontSize: '0.8em', marginLeft: '10px' }}>
                                (Tạo lúc: {raw.createdAt?.toDate().toLocaleDateString('vi-VN')})
                            </span>
                        </RawInfo>
                        <div>
                            <Button 
                                onClick={() => copyRawLink(raw.rawId)}
                            >
                                Copy Link Raw
                            </Button>
                            <Button 
                                danger
                                onClick={() => onDelete(raw.rawId)}
                            >
                                Xóa Raw
                            </Button>
                        </div>
                    </RawItem>
                ))
            )}
        </ListContainer>
    );
}
