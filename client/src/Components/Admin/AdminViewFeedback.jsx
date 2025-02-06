import React from "react";
import "../../Assets/Styles/AdminViewFeedback.css";

function AdminViewFeedback() {
  return (
    <div>
      <div className="container">
        <div className="row mt-5">
          <div className="col-12">
            <div className="feedback_head">
              <p>Feedback</p>
            </div>
          </div>
          <div className="col-6 mb-3">
            <div className="feedback_cards">
              <div className="feedback_user_details">
                <div className="feedback_user_name_box">
                  <div className="feedback_user_image d-flex">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSA1zygA3rubv-VK0DrVcQ02Po79kJhXo_A&s"
                      alt=""
                    />
                    <div className="mx-2">
                    <p className="m-0"><b>User Name</b></p>
                    <p className="m-0 text-secondary">
                        <small>02/25/2222</small>
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
                          color: "#ffc107",
                          // color: star <= rating ? "#ffc107" : "#ccc",
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
                  <p>gfg fg f g </p>
                </div>
              </div>

              <div className="col-12">
                <p className="m-0 text-secondary">
                  <small>1231231231 | 123@gmail.com</small>
                </p>
              </div>
            </div>
          </div>
          <div className="col-6 mb-3">
            <div className="feedback_cards">
              <div className="feedback_user_details">
                <div className="feedback_user_name_box">
                  <div className="feedback_user_image d-flex">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSA1zygA3rubv-VK0DrVcQ02Po79kJhXo_A&s"
                      alt=""
                    />
                    <div className="mx-2">
                      <p className="m-0"><b>User Name</b></p>
                      <p className="m-0 text-secondary">
                        <small>02/25/2222</small>
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
                          color: "#ffc107",
                          // color: star <= rating ? "#ffc107" : "#ccc",
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
                  <p>gfg fg f g Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos ab molestias labore minima aspernatur a tempora optio rerum eum aut eligendi impedit quam cumque veniam quod, aliquid maiores reprehenderit dolores. Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit vel at laboriosam dolorem, eum eaque obcaecati quod enim dolores temporibus, maxime soluta laudantium beatae laborum alias distinctio ducimus neque porro. </p>
                </div>
              </div>

              <div className="col-12">
                <p className="m-0 text-secondary">
                  <small>1231231231 | 123@gmail.com</small>
                </p>
              </div>
            </div>
          </div>
          <div className="col-6 mb-3">
            <div className="feedback_cards">
              <div className="feedback_user_details">
                <div className="feedback_user_name_box">
                  <div className="feedback_user_image d-flex">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSA1zygA3rubv-VK0DrVcQ02Po79kJhXo_A&s"
                      alt=""
                    />
                    <div className="mx-2">
                      <p className="m-0">User Name</p>
                      <p className="m-0 text-secondary">
                        <small>02/25/2222</small>
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
                          color: "#ffc107",
                          // color: star <= rating ? "#ffc107" : "#ccc",
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
                  <p>gfg fg f g </p>
                </div>
              </div>

              <div className="col-12">
                <p className="m-0 text-secondary">
                  <small>1231231231 | 123@gmail.com</small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminViewFeedback;
