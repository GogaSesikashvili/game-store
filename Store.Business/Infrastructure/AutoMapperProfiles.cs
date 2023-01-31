using AutoMapper;
using Store.Business.Models;
using Store.Data.Entities;

namespace Store.Business.Infrastructure
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Game, GameModel>().ReverseMap();
            CreateMap<Genre, GenreModel>().ReverseMap();
            CreateMap<Comment, CommentModel>().ReverseMap();
        }
    }
}