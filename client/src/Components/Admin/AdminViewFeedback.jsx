import React, { useEffect, useState } from "react";
import "../../Assets/Styles/AdminViewFeedback.css";
import axios from "axios";
import { toast } from "react-toastify";
import { API_BASE_URL, IMG_BASE_URL } from "../../Services/BaseURL";

function AdminViewFeedback() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .post(`${API_BASE_URL}/viewAllFeedbacks`)
      .then((res) => {
        console.log(res);

        if (res.data.status === 200) {
          setData(res.data.data.reverse());
        } else {
          setData([]);
        }
      })
      .catch((err) => {
        console.error("Error submitting rating:", err);
      });
  }, []);

  return (
    <div>
      <div className="container">
        <div className="row mt-5">
          <div className="col-12">
            <div className="feedback_head">
              <p>Feedback</p>
            </div>
          </div>
          {data.length ? (
            data.map((details) => {
              return (
                <div className="col-6 mb-3">
                  <div className="feedback_cards">
                    <div className="feedback_user_details">
                      <div className="feedback_user_name_box">
                        <div className="feedback_user_image d-flex">
                          <img
                            src={`${IMG_BASE_URL}/${details.userId.profilePic.filename}`}
                            alt={details.movieName}
                          />
                          <div className="mx-2">
                            <p className="m-0">
                              <b>{details.userId.name}</b>
                            </p>
                            <p className="m-0 text-secondary">
                              <small>{details.date.slice(0,10)}</small>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="feedback_user_rating_start">
                        <div className="rating-stars text-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span
                              key={star}
                              style={{
                                fontSize: "24px",
                                cursor: "pointer",
                                color: star <= details.rating ? "#ffc107" : "#ccc",
                              }}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="col-12 mt-3">
                      <div className="feedback_comment_section">
                        <p>{details.comment}</p>
                      </div>
                    </div>

                    <div className="col-12">
                      <p className="m-0 text-secondary">
                        <small>{details.userId.contact} | {details.userId.email}</small>
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <h1 className="text-center mt-5">No Reviews Found</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminViewFeedback;
