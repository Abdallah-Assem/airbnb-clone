
using BLL.ModelVM.LIstingVM;
using BLL.Rsponse;

namespace BLL.Services.Abstractions
{
    interface IListingService
    {
        Task<Response<int>> CreateListingAsync(CreateListingVM vm, Guid hostUserId, string imagesFolder = "listings");
    }
}
