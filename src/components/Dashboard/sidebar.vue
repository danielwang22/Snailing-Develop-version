<template>
    <div>
        <nav class="d-lg-none d-lg-block d-flex flex-row flex-wrap bg-light sidebar h-100">
            <div class="sidebar-sticky">
                <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-1 mt-4 mb-1 text-muted font-weight-bold">
                <span>管理員</span>
                <a class="d-flex align-items-center text-muted" href="#">
                    <span data-feather="plus-circle"></span>
                </a>
                </h6>
                <ul class="nav flex-lg-column flex-md-row flex-row mb-2">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/admin/Dashboard/products">
                        <i class="fas fa-box-open"></i>
                        產品列表
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/admin/Dashboard/orderlist">
                        <i class="far fa-list-alt"></i>
                        訂單列表
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/admin/Dashboard/coupon">
                        <i class="fas fa-ticket-alt"></i>
                        優惠券
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/admin/Dashboard/analysis">
                        <i class="fas fa-chart-line"></i>
                        數據分析
                        </router-link>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
  
}
</script>