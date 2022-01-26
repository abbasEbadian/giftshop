import React from 'react'
function ProfileAside({active}) {

    return (
        <aside className="col-md-3" id="profile-aside">
            <style JSX>{`
            #profile-aside li.active{
                background-color:rgba(147, 202, 245, 1);
            }
            #profile-aside li.active i{
                color:#fff;
                opacity: 1;
            }`}

            </style>
            <h5 className="text-center py-3">پنل کاربری</h5>
            <div className="card-profile-tab">
              <ul>
                <li className={active==="proflie"? "active": ""}>
                  <i class="bi bi-person-square"></i>
                  <a href="#">مشخصات</a>
                </li>
                <li className={active==="favorite"? "active": ""}>
                  <i class="bi bi-bookmark"></i>
                  <a href="#">مورد علاقه ها</a>
                </li>
                <li className={active==="purchase_report"? "active": ""}>
                  <i class="bi bi-journal-text"></i>
                  <a href="#">گزارش خرید ها</a>
                </li>
              </ul>
            </div>
          </aside>
    )
}

export default ProfileAside
