import styled from "styled-components";
// import axios, { AxiosResponse } from "axios";
import { useState, useRef, useEffect } from "react";

// import DeleteIcon from "../../../assets/delete.svg";
import YellowLeft from "../../../assets/yellowleft.svg";
import YellowRight from "../../../assets/yellowright.svg";
import Deposit from "../../../assets/svg/deposit.svg";

import { Account, ApiResponse } from "../../../interface/asset";
// import { getLocalstorage } from "../../../util/localStorage";

// interface El {
//   id: number;
//   bank_name: string;
//   bank_amount: number;
// }

interface SavingAccountProps {
  assetdata?: ApiResponse["data"];
}

const Main = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const SavingAccountList = styled.div`
  display: flex;
  justify-content: center;
`;

const SavingAccountContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 8vh;
  width: 8vw;
  border-radius: 3rem;
  box-shadow: 0px 4px 13px 0px rgb(0, 0, 0, 0.1);
  border: 1px solid #d9d9d9;
  padding: 3rem;
  margin: 5rem;

  position: relative;
`;

const Top = styled.div`
  display: flex;
`;

const BankName = styled.div`
  font-size: 4rem;
  margin-bottom: 2rem;
  color: #414141;
`;

// const Delete = styled.div`
//   cursor: pointer;
//   width: 3rem;
//   height: 3rem;
//   background-image: url(${DeleteIcon});
//   background-size: cover;
//   background-repeat: no-repeat;
//   margin-left: 10rem;

//   position: absolute;
//   top: 2rem;
//   right: 2rem;
// `;

const BankAmount = styled.div`
  font-size: 4rem;
`;

const EmptyText = styled.div`
  font-size: 3rem;
  text-align: center;
  margin-top: 5rem;
  margin-bottom: 5rem;
`;

const PageButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LeftButton = styled.img`
  cursor: pointer;
  margin-right: 5rem;
`;

const RightButton = styled.img`
  cursor: pointer;
  margin-left: 5rem;
`;

const BankImg = styled.div`
  background: url(${Deposit});
  background-size: 100% 100%;
  background-position: center;

  margin-right: 2rem;

  width: 4rem;
  height: 4rem;
`;

export default function SavingAccount({ assetdata }: SavingAccountProps) {
  // const [data, setData] = useState<El[]>([]);
  const [displayedData, setDisplayedData] = useState<Account[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const SavingAccountBoxRef = useRef<HTMLDivElement>(null);

  const accountsList = assetdata?.monthlyResponseDto.accountsList;
  console.log(accountsList?.length);

  const depositFilter = accountsList?.filter((e) => {
    return e.acoountType === "입출금";
  });
  console.log(depositFilter);

  // useEffect(() => {
  //   getData();
  // }, []);

  useEffect(() => {
    if (depositFilter && depositFilter.length > 0) {
      setDisplayedData(depositFilter.slice(currentIndex, currentIndex + 3));
    }
  }, [depositFilter, currentIndex]);

  // const getData = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:3000/account");
  //     const data = response.data;
  //     setData(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleDelete = (id: number) => {
  //   const currentData = new Date();
  //   const currentMonth = currentData.getMonth() + 1;
  //   const userId = getLocalstorage("userId");
  //   const acessToken = getLocalstorage("acessToken");

  //   axios.defaults.headers.common["Authorization"] = acessToken;
  //   axios;
  //   axios.delete(`/asset/myInfo/${userId}/${currentMonth}/${id}`).catch((err) => {
  //     if (err.response) {
  //       const errMessage = (err.response as AxiosResponse<{ message: string }>)?.data.message;
  //       window.alert(errMessage);
  //       console.log(errMessage);
  //     } else {
  //       console.error(err);
  //       window.alert("An unknown error occurred.");
  //     }
  //   });
  // };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 3);
    }
  };

  const handleNext = () => {
    if (currentIndex + 3 < (depositFilter?.length ?? 0)) {
      setCurrentIndex(currentIndex + 3);
    }
  };

  return (
    <Main ref={SavingAccountBoxRef}>
      {displayedData.length > 0 ? (
        <SavingAccountList>
          {displayedData.map((el) => (
            <SavingAccountContainer key={el.accountId}>
              {/* <Delete onClick={() => handleDelete(el.accountId)} /> */}
              <Top>
                <BankImg />
                <BankName>{el.bankname}</BankName>
              </Top>
              <BankAmount>{el.balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</BankAmount>
            </SavingAccountContainer>
          ))}
        </SavingAccountList>
      ) : (
        <EmptyText>표시할 내용이 없습니다.</EmptyText>
      )}
      <PageButton>
        <LeftButton src={YellowLeft} alt="Left" onClick={handlePrevious} />
        <RightButton src={YellowRight} alt="Right" onClick={handleNext} />
      </PageButton>
    </Main>
  );
}
