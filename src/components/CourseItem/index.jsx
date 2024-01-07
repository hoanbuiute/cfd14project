import React from "react";
import { Link } from "react-router-dom";
import PATHS from "../../constants/paths";
import moment from "moment";
import { COURSE_ITEM_TYPE } from "../../constants/general";

import { ROLE } from "../../constants/role";
import { formatCurrency, formatDate } from "../../utils/format";
import Button from "../Button";


const CourseItem = ({
  type = COURSE_ITEM_TYPE.normal,
  image,
  slug,
  name,
  teams,
  startDate,
  tags,
  price,
}) => {
  // console.log ("teams",teams);
  const teacherInfo = teams?.find((items) => items.tags.includes(ROLE.teacher)); //tìm cái item có tên teacher
  // console.log("teacherInfo", teacherInfo);
  const detailPaths = PATHS.COURSE.INDEX + `/${slug}`;
  const orderPaths = "/course-order" + `/${slug}`;

  if (type === COURSE_ITEM_TYPE.normal) {
    return (
      <div className="courses__list-item">
        <div className="img">
          <Link to={detailPaths}>
            <img
              src={image}
              alt="Khóa học CFD"
              className="course__thumbnail"
            />
            {
              tags?.length>0 &&  <span className="course__img-badge badge">{tags.join(" | ")}</span>
            }
           
          </Link>
        </div>
        <div className="content">
          <p className="label">Front-End</p>
          <h3 className="title --t3">
            <Link to={detailPaths}>
              {name || ""}
            </Link>
          </h3>
          <div className="content__info">
            {
              teacherInfo && (<div className="user">
              <div className="user__img">
                <img src={teacherInfo.image || ""} alt="Avatar teacher" />
              </div>
              <p className="user__name">{teacherInfo.name || ""}</p>
            </div>)
            }
            {/* <div className="user">
              <div className="user__img">
                <img src="img/avatar_nghia.jpg" alt="Avatar teacher" />
              </div>
              <p className="user__name">Trần Nghĩa</p>
            </div> */}
            <div className="price">
              <strong>{formatCurrency(price)}</strong>
            </div>
          </div>
          {/* <div className="content__action">
            <Button link={detailPaths} variant="primary">
              Đăng ký ngay yyyyyyyyyyyyyyyy
            </Button>
            <Button link={detailPaths} variant="default">
              <img src="img/icon-paper.svg" alt="icon paper" />
            </Button>
          </div> */}
        </div>
      </div>
    );
  }
//Course Coming
  return (
    <div className="coursecoming__item">
      <div className="coursecoming__item-img">
        <Link to={detailPaths}>
          <img src={image || ""} alt="Khóa học sắp ra mắt CFD" />
        </Link>
      </div>
      <div className="coursecoming__item-content">
        <p className="category label">Front-end</p>
        <h2 className="title --t2">
          <Link to={detailPaths}>{name || ""} </Link>
        </h2>
        {!!teacherInfo && (
          <div className="user">
            <div className="user__img">
              <img src={teacherInfo.image || ""} alt="Avatar teacher" />
            </div>
            <p className="user__name">{teacherInfo.name || ""}</p>
          </div>
        )}
        <div className="info">
          {startDate && (
            <div className="labeltext">
              <span className="label --blue">Ngày khai giảng</span>
              <p className="title --t2">
                {formatDate(startDate)}
              </p>
            </div>
          )}
          {tags?.length > 0 && (
            <div className="labeltext">
              <span className="label --blue">Hình thức học</span>
              <p className="title --t2">{tags.join(" | ")}</p>
            </div>
          )}
        </div>
        <div className="btnwrap">
          <Button link={orderPaths} variant="primary">
            Đăng Ký Học
          </Button>
          <Button link={detailPaths}  variant="borderBlack">
            Xem chi tiết
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseItem;
