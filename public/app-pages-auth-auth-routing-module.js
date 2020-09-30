(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["app-pages-auth-auth-routing-module"],{

/***/ "./src/app/pages/auth/auth-routing.module.ts":
/*!***************************************************!*\
  !*** ./src/app/pages/auth/auth-routing.module.ts ***!
  \***************************************************/
/*! exports provided: routes, NgxAuthRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routes", function() { return routes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxAuthRoutingModule", function() { return NgxAuthRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _nebular_auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nebular/auth */ "./node_modules/@nebular/auth/index.js");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./login/login.component */ "./src/app/pages/auth/login/login.component.ts");
/* harmony import */ var _login_login_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./login/login.module */ "./src/app/pages/auth/login/login.module.ts");
/* harmony import */ var _register_register_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./register/register.component */ "./src/app/pages/auth/register/register.component.ts");
/* harmony import */ var _register_register_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./register/register.module */ "./src/app/pages/auth/register/register.module.ts");








var routes = [
    {
        path: '',
        component: _nebular_auth__WEBPACK_IMPORTED_MODULE_3__["NbAuthComponent"],
        children: [
            {
                path: '',
                redirectTo: 'login',
                pathMatch: 'full',
            },
            {
                path: 'login',
                component: _login_login_component__WEBPACK_IMPORTED_MODULE_4__["LoginComponent"],
            },
            {
                path: 'register',
                component: _register_register_component__WEBPACK_IMPORTED_MODULE_6__["RegisterComponent"],
            },
        ],
    },
];
var NgxAuthRoutingModule = /** @class */ (function () {
    function NgxAuthRoutingModule() {
    }
    NgxAuthRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes), _nebular_auth__WEBPACK_IMPORTED_MODULE_3__["NbAuthModule"], _login_login_module__WEBPACK_IMPORTED_MODULE_5__["LoginComponentModule"], _register_register_module__WEBPACK_IMPORTED_MODULE_7__["RegisterComponentModule"]],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
        })
    ], NgxAuthRoutingModule);
    return NgxAuthRoutingModule;
}());



/***/ })

}]);
//# sourceMappingURL=app-pages-auth-auth-routing-module.js.map