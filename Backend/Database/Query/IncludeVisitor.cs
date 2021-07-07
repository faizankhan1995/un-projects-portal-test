﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace UnProjectsPortal.Database.Query
{
    public class IncludeVisitor : ExpressionVisitor
    {
        public string Path { get; private set; } = string.Empty;

        protected override Expression VisitMember(MemberExpression node)
        {
            Path = string.IsNullOrEmpty(Path) ? node.Member.Name : $"{node.Member.Name}.{Path}";

            return base.VisitMember(node);
        }
    }
}
