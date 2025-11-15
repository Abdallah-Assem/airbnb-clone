
namespace BLL.Rsponse
{
    public record Response<T>(T Data, string? Message, bool IsSuccess);


}
