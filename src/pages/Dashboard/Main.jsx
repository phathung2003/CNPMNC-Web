export default function Main() {

    // Định nghĩa các thông tin tổng quan ở đây
    const totalUsers = 1500;
    const totalSales = 30000;
    const newOrders = 25;

    return (
        <div>
            <h3>Trang điều khiển</h3>
            <div className="d-flex justify-content-between align-items-center">

                <div className="col-md-3">
                    <div className="card rounded border-2 border-primary text-center">
                        <div className="card-body">
                            <h5 className="card-title">Số người dùng</h5>
                            <p className="card-text">{totalUsers}</p>
                        </div>
                    </div>
                </div>


                <div className="col-md-3 ml-1">
                    <div className="card rounded border-2 border-success text-center">
                        <div className="card-body align-middle">
                            <h5 className="card-title">Đơn thuê xe</h5>
                            <p className="card-text">{totalSales}</p>
                        </div>
                    </div>
                </div>


                <div className="col-md-3 ml-1">
                    <div className="card rounded border-2 border-warning text-center">
                        <div className="card-body">
                            <h5 className="card-title">Đơn đặt trước</h5>
                            <p className="card-text">{newOrders}</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 ml-1">
                    <div className="card rounded border-2 border-danger text-center">
                        <div className="card-body">
                            <h5 className="card-title">Doanh thu</h5>
                            <p className="card-text">{newOrders}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}