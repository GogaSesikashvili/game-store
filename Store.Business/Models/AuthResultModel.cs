﻿namespace Store.Business.Models
{
    public class AuthResultModel
    {
        public string Token { get; set; }
        public string RefreshToken { get; set; }
        public DateTime ExpiresAt { get; set; }
        public string FullName { get; set; }
        public string Avatar { get; set; }
    }
}