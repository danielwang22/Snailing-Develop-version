<template>
        <footer class="container-fluid mt-5 p-0">
            <div class="footer-background d-flex flex-column justify-content-center align-items-center p-lg-7 p-md-5 p-5 position-relative">
                <img src="@/assets/img/logo-all-dark.svg" alt="Sweetast">
                <h1 class="text-light text-center mb-4 text-shadow">Subscribe To Our Newsletter</h1>
                <div class="input-group w-50">
                    <input type="text" class="form-control p-1 p-md-4 shadow" placeholder="example@gmail.com" aria-label="Recipient's username" aria-describedby="button-addon2">
                    <div class="input-group-append">
                        <button class="btn btn-secondary" type="button" id="button-addon2">Button</button>
                    </div>
                </div>
            </div>
        </footer>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Titillium+Web:700&display=swap');
.footer-background{
    font-family: 'Titillium Web', sans-serif;
    background-image: url('../assets/footer.svg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    height: auto;
}
@media only screen and (max-width: 1400px) {
    .footer-background{
        img{
            width: 30%;
            margin-bottom: 20px;
        }
    }
}
@media only screen and (max-width: 992px) {
    .footer-background{
        img{
            width: 50%;
            margin-bottom: 20px;
        }
    }
}
@media only screen and (max-width: 768px) {
    .footer-background{
        img{
            width: 60%;
            margin-bottom: 20px;
        }
    }
}
@media only screen and (max-width: 576px) {
    .footer-background{
        img{
            width: 60%;
            margin-bottom: 40px;
        }
    }
}
@media only screen and (max-width: 480px) {
    .footer-background{
        img{
            width: 75%;
            margin-bottom: 20px;
        }
        h1{
            font-size: 2rem;
        }
        .input-group{
            width: 75% !important;
        }
    }
}
</style>
