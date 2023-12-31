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
      .get(`http://localhost:8089/history/${username}`)
      .then((res) => {
        setData(res.data.data);
      });
  }, [username]);

  return (
    <div className="popup-container">
      <Header />
      <h3>
        Lịch sử đấu giá của{" "}
        {username === "chudat@gmail.com" ? "người dùng" : `${username?.split("@")[0]}`}
      </h3>
      <table>
        <thead>
          <tr>
            <th>Thời gian</th>
            {username === "chudat@gmail.com" && <th>Người dùng</th>}
            <th>Tên vật phẩm</th>
            <th>Giá đấu</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: any, index: any) => (
            <tr key={index}>
              <td className="time">
                {moment.utc(item.datetime).format("DD MM YYYY, h:mm:ss a")}
              </td>
              {username === "chudat@gmail.com" && (
                <td className="username">
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/user/${item.user.id}`}
                  >
                    {item.username.split("@")[0]}
                  </Link>
                </td>
              )}
              <td>
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/detail/${item.product?.id}`}
                >
                  {item.name}
                </Link>
              </td>
              <td>{item.price} (USD)</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default HistoryList;
