using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using UnProjectsPortal.Database.Entities;
using UnProjectsPortal.Database.Interfaces;
using UnProjectsPortal.Database.Specifications;

namespace UnProjectsPortal.Database.Repositories
{
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : EntityBase
    {
        protected readonly DbContext Context;

        public Repository(DbContext dbContext)
        {
            Context = dbContext;
        }

        public TEntity Find(int entityID)
        {
            return Context.Set<TEntity>().Find(entityID);
        }
        public IEnumerable<TEntity> GetAll()
        {
            return Context.Set<TEntity>().ToList();
        }

        public IEnumerable<TEntity> Find(ISpecification<TEntity> spec)
        {
            return ApplySpecification(spec);
        }
        public void Add(TEntity entity)
        {
            Context.Set<TEntity>().Add(entity);
        }
        public TEntity Update(TEntity entity)
        {
            return Context.Set<TEntity>().Update(entity).Entity; //TODO : Verify if it works fine
        }
        public void AddRange(IEnumerable<TEntity> entities)
        {
            Context.Set<TEntity>().AddRange(entities);
        }
        public virtual void Remove(TEntity entity)
        {
            Context.Set<TEntity>().Remove(entity);
        }

        public void RemoveRange(IEnumerable<TEntity> entities)
        {
            Context.Set<TEntity>().RemoveRange(entities);
        }

        private IEnumerable<TEntity> ApplySpecification(ISpecification<TEntity> spec)
        {
            return SpecificationEvaluator<TEntity>.GetQuery(Context.Set<TEntity>().AsQueryable(), spec).ToList();
        }
    }
}
