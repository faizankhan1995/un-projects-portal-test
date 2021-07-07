using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnProjectsPortal.Database.Entities;

namespace UnProjectsPortal.Database.Interfaces
{
    public interface IRepository<TEntity> where TEntity : EntityBase
    {
        TEntity Find(int id);
        IEnumerable<TEntity> GetAll();
        IEnumerable<TEntity> Find(ISpecification<TEntity> spec);
        void Add(TEntity entity);
        TEntity Update(TEntity entity);
        void AddRange(IEnumerable<TEntity> entities);
        //void Update(T entity);
        void Remove(TEntity entity);
        void RemoveRange(IEnumerable<TEntity> entities);
        //int Count(ISpecification<T> spec);

        //int SaveChanges();
    }
}
