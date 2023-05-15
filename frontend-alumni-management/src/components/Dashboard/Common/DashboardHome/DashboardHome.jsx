import React from 'react';

const DashboardHome = () => {
    return (
        <div>
            <div>
                <div className="row g-3 my-2 text-white">
                    <div className="col-lg-6 col-xl-4">
                        <div className="p-4 shadow-sm d-flex justify-content-around align-items-center rounded" style={{ backgroundColor: '#5a00dd' }}>
                            <div className="col-8">
                                <h3 className="fw-bold fs-2 m-0">200</h3>
                                <p className="m-0">University Rank</p>
                            </div>
                            <span className="col-4 text-start">
                                <i className="fa-solid fa-building-columns fs-2 primary-text border rounded-full secondary-bg p-3 m-0"></i>
                            </span>
                        </div>
                    </div>

                    <div className="col-lg-6 col-xl-4">
                        <div className="p-4 shadow-sm d-flex justify-content-around align-items-center rounded" style={{ backgroundColor: '#fa5649' }}>
                            <div className="col-8">
                                <h3 className="fw-bold fs-2 m-0">12,456</h3>
                                <p className="m-0">Placements</p>
                            </div>
                            <span className="col-4 text-start">
                                <i className="fas fa-briefcase fs-2 primary-text border rounded-full secondary-bg p-3 m-0"></i>
                            </span>
                        </div>
                    </div>
                    <div className="col-lg-6 col-xl-4">
                        <div className="p-4  shadow-sm d-flex justify-content-around align-items-center rounded" style={{ backgroundColor: '#ffa113' }}>
                            <div className="col-8">
                                <h3 className="fw-bold fs-2 m-0">90,000+</h3>
                                <p className="m-0">Students</p>
                            </div>
                            <span className="col-4 text-start">
                                <i
                                    className="fas fa-users fs-2 primary-text border rounded-full secondary-bg p-3 m-0"></i>
                            </span>

                        </div>
                    </div>


                </div>
            </div>



            <div className="w-100 mt-5">

                <div
                    className="video"
                    style={{
                        position: "relative",
                        paddingBottom: "45%" /* 16:9 */,
                        paddingTop: 25,
                        height: 0
                    }}
                >
                    <iframe
                        // title={course.name}
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%"
                        }}
                        src="https://www.youtube.com/embed/oxr7oSHC1Kc"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen
                    />
                </div>





                {/* <iframe width="100%" height="100%" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}
            </div>
        </div>
    );
};

export default DashboardHome;