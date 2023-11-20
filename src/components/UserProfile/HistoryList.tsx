import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../../pages/Header/Header";
import "./historylist.scss";

const HistoryList = () => {
  const { username } = useParams();
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8089/history/${username}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setData(res.data.data);
      });
  }, [username]);

  return (
      <div className="popup-container">
        <Header />
        <h3>Lịch sử đấu giá của {username === 'chudat' ? 'người dùng' : `${username}`}</h3>
        <table>
          <thead>
            <tr>
              <th>Thời gian</th>
              <th>Tên vật phẩm</th>
              <th>Giá đấu</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: any, index: any) => (
              <tr key={index}>
                <td className="time">
                  {moment.utc(item.datetime).format("MMMM Do YYYY, h:mm:ss a")}
                </td>
                <td><Link style={{textDecoration:'none'}} to={`/detail/${item.product?.id}`}>{item.name}</Link></td>
                <td>{item.price}{' '}(USD)</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
};
export default HistoryList;