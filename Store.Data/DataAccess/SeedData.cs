using Microsoft.Extensions.DependencyInjection;
using Store.Data.Entities;

namespace Store.Data.DataAccess
{
    public static class SeedData
    {
        public static async Task InitializeAsync(IServiceProvider services)
        {
            await AddTestData(services.GetRequiredService<StoreDbContext>());
        }

        public static async Task AddTestData(StoreDbContext context)
        {
            if (context.Games.Any())
            {
                return;
            }

            var Games = new List<Game>()
            {
                    new Game()
                    {
                        Name ="Assassin's Creed® IV Black Flag",
                        Description="The year is 1715. Pirates rule the Caribbean and have established their own lawless Republic where corruption, greediness and cruelty are commonplace.Among these outlaws is a brash young captain named Edward Kenway.",
                        Image ="https://i.pinimg.com/736x/54/6f/28/546f2818b25ad5dc0675bc976c390448.jpg",
                        Price = 21.99m,
                        Genres = new List<Genre>()
                        {
                            new Genre()
                            {
                                Name = "Strategy"
                            },
                            new Genre()
                            {
                                Name = "Action"
                            },
                        }
                    },

                new Game()
                    {
                        Name ="Assassin's Creed Unity",
                        Description="Assassin’s Creed Unity tells the story of Arno, a young man who embarks upon an extraordinary journey to expose the true powers behind the French Revolution. In the brand new co-op mode, you and your friends will also be thrown in the middle of a ruthless struggle for the fate of a nation.",
                        Image ="https://cdn.europosters.eu/image/750/posters/assassin-s-creed-unity-cover-i22385.jpg",
                        Price = 16.49m,
                        Genres = new List<Genre>()
                        {
                            new Genre()
                            {
                                Name = "Rpg"
                            },
                            new Genre()
                            {
                                Name = "Misc",
                                ParentId = 2
                            },
                        }
                    },
                new Game()
                    {
                        Name ="Assassin's Creed Syndicate",
                        Description="London, 1868. In the heart of the Industrial Revolution, lead your underworld organization and grow your influence to fight those who exploit the less privileged in the name of progress",
                        Image ="https://gamerhash.com/storage/mobile-products/9c56OaeZXNGSXc3TBAKC7cOT40Pi0WEiYHg6MCMo.jpeg",
                        Price = 21.99m,
                        Genres = new List<Genre>()
                        {
                            new Genre()
                            {
                                Name = "Races"
                            },
                        }
                    },
                new Game()
                    {
                        Name ="Assassin's Creed Origins",
                        Description="ASSASSIN’S CREED ORIGINS IS A NEW BEGINNING *The Discovery Tour by Assassin’s Creed®: Ancient Egypt is available now as a free update!* Ancient Egypt, a land of majesty and intrigue, is disappearing in a ruthless fight for power.",
                        Image ="https://store.ubi.com/dw/image/v2/ABBS_PRD/on/demandware.static/-/Sites-masterCatalog/default/dw7fe341f3/images/large/592450934e0165f46c8b4568.jpg",
                        Price = 32.99m,
                        Genres = new List<Genre>()
                        {
                            new Genre()
                            {
                                Name = "Tps",
                                ParentId = 2
                            },
                        }
                    },
                new Game()
                    {
                        Name ="Assassin's Creed Odyssey",
                        Description="Choose your fate in Assassin's Creed® Odyssey. From outcast to living legend, embark on an odyssey to uncover the secrets of your past and change the fate of Ancient Greece.",
                        Image ="https://static.displate.com/280x392/displate/2022-09-16/f894e0b03594830cc196cd7e53627a16_3c0cc9a9e3114d40aa26320d36ebcda8.jpg",
                        Price = 32.99m,
                        Genres = new List<Genre>()
                        {
                            new Genre()
                            {
                                Name = "Adventure"
                            },
                        }
                    },
                new Game()
                    {
                        Name ="God of War",
                        Description="His vengeance against the Gods of Olympus years behind him, Kratos now lives as a man in the realm of Norse Gods and monsters. It is in this harsh, unforgiving world that he must fight to survive… and teach his son to do the same.",
                        Image ="https://cdn.europosters.eu/image/750/posters/playstation-god-of-war-i116582.jpg",
                        Price = 39.99m,
                        Genres = new List<Genre>()
                        {
                            new Genre()
                            {
                                Name = "Puzzle & skill"
                            },
                        }
                    },
                new Game()
                    {
                        Name ="EA SPORTS™ FIFA 23",
                        Description="FIFA 23 brings The World’s Game to the pitch, with HyperMotion2 Technology that delivers even more gameplay realism, men’s and women’s FIFA World Cup coming during the season, women’s club teams, cross-play features*, and more.",
                        Image ="https://smartcdkeys.com/image/data/products/fifa-23/cover/fifa-23-ps5-smartcdkeys-cheap-cd-key-cover.jpg",
                        Price = 69.99m,
                        Genres = new List<Genre>()
                        {
                            new Genre()
                            {
                                Name = "Other"
                            },
                        }
                    },
                new Game()
                    {
                        Name ="The Witcher 3: Wild Hunt",
                        Description="As war rages on throughout the Northern Realms, you take on the greatest contract of your life — tracking down the Child of Prophecy, a living weapon that can alter the shape of the world.",
                        Image ="https://m.media-amazon.com/images/I/81nBSbgcxFL._SY679_.jpg",
                        Price = 19.99m,
                        Genres = new List<Genre>()
                        {
                            new Genre()
                            {
                                Name = "Rally",
                                ParentId = 1
                            },
                        }
                    },
                new Game()
                    {
                        Name ="Red Dead Redemption 2",
                        Description="Winner of over 175 Game of the Year Awards and recipient of over 250 perfect scores, RDR2 is the epic tale of outlaw Arthur Morgan and the infamous Van der Linde gang, on the run across America at the dawn of the modern age. Also includes access to the shared living world of Red Dead Online.",
                        Image ="https://m.media-amazon.com/images/I/71nlEoSrewL._AC_SY679_.jpg",
                        Price = 34.99m,
                        Genres = new List<Genre>()
                        {
                            new Genre()
                            {
                                Name = "Arcade",
                                ParentId= 1
                            },
                        }
                    },
                new Game()
                    {
                        Name ="Forza Horizon 5",
                        Description="Blast off to the visually stunning, exhilarating Horizon Hot Wheels Park in the clouds high above Mexico. Race 10 amazing new cars on the fastest, most extreme tracks ever devised. Design, build, and share your own Hot Wheels adventure. Requires Forza Horizon 5 game, sold separately",
                        Image ="https://picfiles.alphacoders.com/479/thumb-479583.jpg",
                        Price = 34.77m,
                        Genres = new List<Genre>()
                        {
                            new Genre()
                            {
                                Name = "Formula",
                                ParentId = 1
                            },
                        }
                    },
                new Game()
                    {
                        Name ="Call of Duty: Modern Warfare II",
                        Description="Call of Duty®: Modern Warfare® II drops players into an unprecedented global conflict that features the return of the iconic Operators of Task Force 141.",
                        Image ="https://i.ebayimg.com/images/g/414AAOSwzEdilXTv/s-l500.jpg",
                        Price = 69.99m,
                        Genres = new List<Genre>()
                        {
                            new Genre()
                            {
                                Name = "Off-road",
                                ParentId = 1
                            },
                        }
                    },
                new Game()
                    {
                        Name ="The Elder Scrolls V: Skyrim Special Edition",
                        Description="Winner of more than 200 Game of the Year Awards, Skyrim Special Edition brings the epic fantasy to life in stunning detail. The Special Edition includes the critically acclaimed game and add-ons with all-new features like remastered art and effects, volumetric god rays, dynamic depth of field, screen-space reflections, and more.",
                        Image ="https://m.media-amazon.com/images/I/51v1IWrWhPL._AC_SY679_.jpg",
                        Price = 24.99m,
                        Genres = new List<Genre>()
                        {
                            new Genre()
                            {
                                Name = "Fps",
                                ParentId = 2
                            },
                        }
                    }
            };

            await context.Games.AddRangeAsync(Games);

            await context.SaveChangesAsync();
        }
    }
}