namespace Store.Business.Validation
{
    public class StoreException : Exception
    {
        public StoreException()
        {
        }

        public StoreException(string message)
        : base(message)
        {
        }
    }
}