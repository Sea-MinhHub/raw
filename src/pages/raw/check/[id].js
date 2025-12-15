import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: var(--background-color);
  text-align: center;
`;

const CountdownCircle = styled.div`
  width: 150px;
  height: 150px;
  border: 8px solid var(--primary-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3em;
  font-weight: bold;
  color: var(--dark-blue);
  margin-bottom: 20px;
`;

const Title = styled.h1`
  color: var(--dark-blue);
`;

const BackButton = styled.a`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #f44336;
  color: white;
  border-radius: 6px;
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
  
  &:hover {
      opacity: 0.9;
  }
`;

// HÀM NÀY CHẠY Ở PHÍA CLIENT (TRÌNH DUYỆT)
export default function RawCheckPage() {
    const router = useRouter();
    const { id } = router.query;
    const [countdown, setCountdown] = useState(10); 

    useEffect(() => {
        if (!id) return;

        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    router.push('/'); 
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [id, router]);

    return (
        <Container>
            <Title>Truy cập bị chặn (Lỗi #403)</Title>
            <p>Đây là link RAW CODE, bạn không được phép xem nó bằng trình duyệt.</p>
            <p>Vui lòng sử dụng các công cụ lập trình (ví dụ: `loadstring` trong Lua) để truy cập.</p>

            <CountdownCircle>
                {countdown}
            </CountdownCircle>
            
            <p>Hệ thống sẽ tự động đưa bạn về trang chủ trong {countdown} giây.</p>
            <BackButton href="/">Về Trang Chủ Ngay</BackButton>
        </Container>
    );
}
