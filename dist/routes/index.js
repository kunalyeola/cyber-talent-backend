"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRoutes_1 = __importDefault(require("./userRoutes"));
// Import future routes here, e.g. import authRoutes from './authRoutes';
const router = (0, express_1.Router)();
// Mount child routes
router.use('/users', userRoutes_1.default);
// router.use('/auth', authRoutes);
exports.default = router;
